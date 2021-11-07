import { readFileSync } from 'fs';

import { join, resolve } from 'path';

import Fastify from 'fastify';
import middie from 'middie';

import { createServer } from 'vite';

const routes = new Set();

export const buildApp = async () => {
  const fastify = Fastify({ logger: true });

  fastify.addHook('onRoute', (route) => {
    routes.add(`${route.method} - ${route.url}`);
  });
  fastify.addHook('onReady', () => {
    routes.forEach((route) => fastify.log.info(`Route registered: ${route}`));
  });

  // API routes
  fastify.register(
    (instance, options, done) => {
      instance.get('/health', async () => ({ healthy: 'yes' }));
      done();
    },
    { prefix: 'api' }
  );

  // SSR
  const vite = await createServer({ server: { middlewareMode: 'ssr' } });
  await fastify.register(middie);
  fastify.use(vite.middlewares);
  fastify.get('/', async (request, reply) => {
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
  });

  await fastify.ready();
  return fastify;
};
