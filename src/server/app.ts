import Fastify from 'fastify';

import { setupAPI } from './api';
import { setupSSR } from './ssr';

const isProd = process.env.NODE_ENV === 'production';
const routes = new Set();

export const buildApp = async () => {
  const fastify = Fastify({ logger: true });

  fastify
    .addHook('onRoute', (route) => {
      routes.add(`${route.method} - ${route.url}`);
    })
    .addHook('onReady', () => {
      routes.forEach((route) => fastify.log.info(`Route registered: ${route}`));
    });

  // API routes
  await setupAPI(fastify);

  // SSR
  await setupSSR(fastify, isProd);

  return fastify;
};
