import { readFileSync } from 'fs';
import { join, resolve } from 'path';

import type { FastifyInstance } from 'fastify';
import middiePlugin from 'middie';
import { createServer } from 'vite';

export const setupSSR = async (fastify: FastifyInstance, isProd: boolean) => {
  const vite = await createServer({ server: { middlewareMode: 'ssr' } });
  await fastify.register(middiePlugin);
  fastify.use(vite.middlewares);

  fastify.get('/', async (request, reply) => {
    if (!isProd) {
      const index = readFileSync(
        resolve(join(__dirname, '../index.html')),
        'utf-8'
      );
      const template = await vite.transformIndexHtml(request.url, index);
      const entry = await vite.ssrLoadModule('/client/entry-server.tsx');
      const app = entry.render();
      const html = template.replace('<!-- ssr-outlet -->', app);
      reply.type('text/html');
      return html;
    } else {
      return 'not setup';
    }
  });
};
