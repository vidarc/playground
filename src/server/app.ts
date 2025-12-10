import { env } from 'node:process';

import { fastifyHelmet } from '@fastify/helmet';
import { fastifyRateLimit } from '@fastify/rate-limit';
import Fastify from 'fastify';

import { setupAPI } from './api.js';
import { setupSSR } from './ssr.js';
import { randomUUID } from 'node:crypto';

const isProd = env.NODE_ENV === 'production';
const routes = new Set<string>();

export const buildApp = async () => {
  const fastify = Fastify({ logger: true, genReqId: () => randomUUID() });

  fastify
    .addHook('onRoute', (route) => {
      const method = Array.isArray(route.method)
        ? route.method.join(', ')
        : route.method;
      routes.add(`${method} - ${route.url}`);
    })
    .addHook('onReady', () => {
      routes.forEach((route) => fastify.log.info(`Route registered: ${route}`));
    });

  fastify.register(fastifyHelmet, {
    enableCSPNonces: true,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'ajax.cloudflare.com'],
        styleSrc: ["'self'"],
      },
    },
  });
  fastify.register(fastifyRateLimit);

  // API routes
  await setupAPI(fastify);

  // SSR
  await setupSSR(fastify, isProd);

  return fastify;
};
