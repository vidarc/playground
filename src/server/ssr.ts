import { readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { env } from 'node:process';
import { PassThrough } from 'node:stream';
import { fileURLToPath, URL } from 'node:url';

import fastifyMiddie from '@fastify/middie';
import fastifyStatic from '@fastify/static';

import type { FastifyInstance } from 'fastify';
import type { ViteDevServer } from 'vite';
import { createServer } from 'vite';

import type { ServerRenderFunction } from '../types.js';

const dirname = fileURLToPath(new URL('.', import.meta.url));

const indexPath =
  env['NODE_ENV'] === 'production'
    ? join(dirname, '../client/index.html')
    : join(dirname, '../index.html');

const getTemplateEntry = async (
  isProd: boolean,
  url: string,
  index: string,
  vite: ViteDevServer
) => {
  const template = isProd ? index : await vite.transformIndexHtml(url, index);

  const entry: { render: ServerRenderFunction } = isProd
    ? // @ts-expect-error won't resolve till build
      // eslint-disable-next-line import/no-unresolved
      await import('../ssr/entry-server.js')
    : await vite.ssrLoadModule('/client/entry-server.tsx');

  return { template, entry };
};

export const setupSSR = async (fastify: FastifyInstance, isProd: boolean) => {
  let vite: ViteDevServer;
  if (!isProd) {
    vite = await createServer({ server: { middlewareMode: 'ssr' } });
    await fastify.register(fastifyMiddie);
    fastify.use(vite.middlewares);
  } else {
    fastify.register(fastifyStatic, {
      root: join(dirname, '../client/assets'),
      preCompressed: true,
      prefix: '/assets',
    });
  }

  fastify.get('/*', (request, reply) => {
    const index = readFileSync(resolve(indexPath), 'utf-8');
    const { url } = request;
    const stream = new PassThrough();

    getTemplateEntry(isProd, request.url, index, vite).then(
      ({ entry, template }) => {
        fastify.log.info('entry created and template created');

        const [start, end] = template.split('<!-- ssr-outlet -->');
        stream.push(start);
        const pipeable = entry.render(url, {
          nonce: reply.cspNonce.script,
          onShellReady() {
            pipeable.pipe(stream);
            reply.code(200).type('text/html').send(stream);
          },
          onAllReady() {
            stream.push(end);
          },
        });
        fastify.log.info('stream created');
      }
    );
  });
};
