import Fastify from 'fastify';
import { SwaggerOptions } from './swagger_options.js';
import fastifySwagger from '@fastify/swagger';
import fastifyCors from '@fastify/cors';
import authMiddleware from './middleware/auth_middleware.mjs';
import AuthRouter from './routes/api/auth/authRouter.js';
import UsersRouter from './routes/api/users/usersRouter.js';
import fastifyJwt from '@fastify/jwt';
import dotenv from 'dotenv';

dotenv.config();

// Crear una instancia de Fastify con registro de logs
const fastify =  Fastify({ logger:true });

// Registrar el plugin de JWT para la autenticación
fastify.register(fastifyJwt, { secret: "test@#$%$" });

// Registrar el plugin de CORS para permitir solicitudes cruzadas
fastify.register(fastifyCors, { origin: "*" });

// Registrar el middleware de autenticación
fastify.register(authMiddleware);

// Registrar el router de autenticación
fastify.register(AuthRouter);

// Registrar el router de usuarios
fastify.register(UsersRouter);

// Registrar el plugin de Swagger para la documentación de la API
fastify.register(fastifySwagger, SwaggerOptions);

// Agregar un parser de contenido para las solicitudes JSON
fastify.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
  try {
      const json = JSON.parse(body);
      done(null, json);
  } catch (err) {
      err.statusCode = 400;
      done(err, undefined);
  }
}); 

// Ruta de prueba
fastify.get('/test/cas', async function (req, res) {  
  return { test : 'test'};
});

// Escuchar en el puerto especificado
try {
  await fastify.listen({
    port: 8000,
    host: '0.0.0.0'
  }, (err, address) => {
    if (!err) {
      console.log(`Server listening at ${address}`);
    } else {
      console.log(err);
    }
  });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
