import { faker } from '@faker-js/faker';
import type { FastifyInstance } from 'fastify';

const generatePerson = (id: number) => ({
  id,
  name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  job: faker.name.jobTitle(),
});

export const setupAPI = async (fastify: FastifyInstance) => {
  await fastify.register(
    (instance, _options, done) => {
      instance.get('/health', async () => ({ healthy: 'yes' }));

      instance.get('/fake', async () => {
        let id = 0;
        const data = Array.from({ length: 10 }, () => generatePerson(id++));
        return data;
      });
      done();
    },
    { prefix: 'api' },
  );
};
