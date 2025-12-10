import { faker } from '@faker-js/faker';
import type { FastifyInstance } from 'fastify';

const generatePerson = (id: number) => ({
  id,
  name: `${faker.person.firstName()} ${faker.person.lastName()}`,
  job: faker.person.jobTitle(),
});

export const setupAPI = async (fastify: FastifyInstance) => {
  await fastify.register(
    (instance, _options, done) => {
      instance.get('/health', (_request, reply) => {
        return reply.send({ healthy: 'yes' });
      });

      instance.get('/fake', (_request, reply) => {
        let id = 0;
        const data = Array.from({ length: 10 }, () => generatePerson(id++));
        return reply.send(data);
      });
      done();
    },
    { prefix: 'api' },
  );
};
