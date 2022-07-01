import { buildApp } from './app';

buildApp().then((fastify) => {
  fastify.ready().then(() => {
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

    fastify.listen({ port, host: '0.0.0.0' }, (error) => {
      if (error) {
        fastify.log.error(error);
        process.exit(1);
      }
    });
  });
});
