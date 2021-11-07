import Fastify from 'fastify';
// @ts-expect-error this is fine
import fastifyVite from 'fastify-vite';
// @ts-expect-error this is fine
import fastifyViteReact from 'fastify-vite-react';

const fastify = Fastify();

async function main() {
  await fastify.register(fastifyVite, {
    root: __dirname,
    renderer: fastifyViteReact,
  });
  // @ts-expect-error this is fine
  await fastify.vite.ready();
  return fastify;
}

if (require.main === module) {
  main().then((fastify) => {
    fastify.listen(3000, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening on ${address}`);
    });
  });
}

module.exports = main;
