import { Handler } from '@netlify/functions';
import fastJson from 'fast-json-stringify';

const stringify = fastJson({
  title: 'hello-world',
  type: 'object',
  properties: {
    hello: {
      type: 'string',
    },
  },
});

export const handler: Handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: stringify({
      hello: 'world',
    }),
  };
};
