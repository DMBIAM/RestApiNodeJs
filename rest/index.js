import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify =  Fastify({ logger:true });

await fastify.register(cors, { });

fastify.get('/', async function (req, res) {  return { test : 'Hello'}; });
fastify.get('/test/cas', async function (req, res) {  return { test : 'test'}; });


try {
  fastify.listen({
    port: 8000,
    host: '0.0.0.0'
  }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
} catch (error) {
    console.log(error);
}