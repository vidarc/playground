import { buildApp } from './app';

buildApp().then((fastify) => {
  const port = process.env.PORT || 3000;

  fastify.listen(port, '0.0.0.0', (error) => {
    if (error) {
      fastify.log.error(error);
      process.exit(1);
    }
  });
});
