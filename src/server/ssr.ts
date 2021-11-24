import { readFileSync } from 'fs';
import { join, resolve } from 'path';

import { PassThrough } from 'stream';

import type { FastifyInstance } from 'fastify';
import fastifyStatic from 'fastify-static';
import middiePlugin from 'middie';
import { createServer, ViteDevServer } from 'vite';

const indexPath =
  process.env.NODE_ENV === 'production'
    ? join(__dirname, '../client/index.html')
    : join(__dirname, '../index.html');

export const setupSSR = async (fastify: FastifyInstance, isProd: boolean) => {
  let vite: ViteDevServer;
  if (!isProd) {
    vite = await createServer({ server: { middlewareMode: 'ssr' } });
    await fastify.register(middiePlugin);
    fastify.use(vite.middlewares);
  } else {
    fastify.register(fastifyStatic, {
      root: join(__dirname, '../client/assets'),
      preCompressed: true,
      prefix: '/assets',
    });
  }

  fastify.get('/*', async (request, reply) => {
    const index = readFileSync(resolve(indexPath), 'utf-8');
    const { url } = request;
    const stream = new PassThrough();

    const template = isProd
      ? index
      : await vite.transformIndexHtml(request.url, index);
    const entry = isProd
      ? require('../ssr/entry-server')
      : await vite.ssrLoadModule('/client/entry-server.tsx');
    const [start, end] = template.split('<!-- ssr-outlet -->');
    stream.push(start);
    const { pipe } = entry.render(url, {
      onCompleteShell() {
        pipe(stream);
        stream.push(end);
      },
    });

    reply.code(200).type('text/html').send(stream);
  });
};
