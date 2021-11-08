import type { FastifyInstance } from 'fastify';

export const setupAPI = async (fastify: FastifyInstance) => {
  await fastify.register(
    (instance, options, done) => {
      instance.get('/health', async () => ({ healthy: 'yes' }));
      done();
    },
    { prefix: 'api' }
  );
};
