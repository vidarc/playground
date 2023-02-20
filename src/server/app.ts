import { env } from 'node:process';

import fastifyHelmet from '@fastify/helmet';
// import fastifyRateLimit from '@fastify/rate-limit';
import Fastify from 'fastify';

// eslint-disable-next-line import/no-unresolved
import { setupAPI } from './api.js';
// eslint-disable-next-line import/no-unresolved
import { setupSSR } from './ssr.js';

const isProd = env['NODE_ENV'] === 'production';
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

  fastify.register(fastifyHelmet, { enableCSPNonces: true });
  // fastify.register(fastifyRateLimit);

  // API routes
  await setupAPI(fastify);

  // SSR
  await setupSSR(fastify, isProd);

  return fastify;
};
