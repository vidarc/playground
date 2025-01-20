import { env } from 'node:process';

import { buildApp } from './app.js';

buildApp()
  .then((fastify) => {
    fastify.ready().then(() => {
      const port = env.PORT ? parseInt(env.PORT) : 3000;

      fastify.listen({ port, host: '0.0.0.0' }, (error) => {
        if (error) {
          fastify.log.error(error);
          process.exit(1);
        }
      });
    });
  })
  .catch((error) => {
    console.error(error);
  });
