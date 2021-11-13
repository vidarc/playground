import { readFileSync } from 'fs';
import { join, resolve } from 'path';

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
      root: join(__dirname, '../client'),
      preCompressed: true,
    });
  }

  fastify.get('/*', async (request, reply) => {
    const index = readFileSync(resolve(indexPath), 'utf-8');

    if (!isProd) {
      const template = await vite.transformIndexHtml(request.url, index);
      const entry = await vite.ssrLoadModule('/client/entry-server.tsx');
      const app = entry.render();
      const html = template.replace('<!-- ssr-outlet -->', app);

      reply.type('text/html');
      return html;
    } else {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const entry = require('../ssr/entry-server');
      const app = entry.render();
      const html = index.replace('<!-- ssr-outlet -->', app);

      reply.type('text/html');
      return html;
    }
  });
};
