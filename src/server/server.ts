import { buildApp } from './app';

buildApp().then((fastify) => {
  fastify.listen(3000, '0.0.0.0', (error) => {
    if (error) {
      fastify.log.error(error);
      process.exit(1);
    }
  });
});
