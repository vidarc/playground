import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';

const server = setupServer(
  rest.get('/api/fake', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, name: 'Santa Claus', job: 'gift giver' }]));
  })
);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => {
  server.close();
});
