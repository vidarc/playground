import type { FastifyInstance } from 'fastify';

export const setupAPI = (fastify: FastifyInstance) => {
  fastify.register(
    (instance, options, done) => {
      instance.get('/health', async () => ({ healthy: 'yes' }));
      done();
    },
    { prefix: 'api' }
  );
};
