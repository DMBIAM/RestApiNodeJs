import Fastify from 'fastify';
import { SwaggerOptions } from './swagger_options.js';
import fastifyCors from '@fastify/cors';
import authMiddleware from './middleware/auth_middleware.mjs';
import AuthRouter from './routes/api/auth/authRouter.js';
import UsersRouter from './routes/api/users/usersRouter.js';
import EventsRouter from './routes/api/events/eventsRouter.js';
import AssistantsRouter from './routes/api/assistants/assistantsRouter.js';
import fastifyJwt from '@fastify/jwt';
import fastifyMultipart from '@fastify/multipart';
import fastifySwagger from '@fastify/swagger';
import path from 'path';
import fastifyAutoload from '@fastify/autoload';
import dotenv from 'dotenv';

// Cargar variable de entorno
dotenv.config();

// Obtener la ruta del directorio actual
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Crear una instancia de Fastify con registro de logs
const fastify = Fastify({ logger:true, ajv: { plugins: [fastifyMultipart.ajvFilePlugin] } });

// Registrar el plugin de JWT para la autenticación
fastify.register(fastifyJwt, { secret: process.env.JWT_SECRET_KEY });

// Registrar el plugin de CORS para permitir solicitudes cruzadas
fastify.register(fastifyCors, { origin: "*" });

// Registrar el middleware de autenticación
fastify.register(authMiddleware);

// Registrar el router de autenticación
fastify.register(AuthRouter);

// Registrar el router de usuarios
fastify.register(UsersRouter);

// Registrar el router de eventos
fastify.register(EventsRouter);

// Registrar el router de asistentes
fastify.register(AssistantsRouter);

// Registrar el plugin de Swagger para la documentación de la API
fastify.register(fastifySwagger, { ...SwaggerOptions });

// Registrar el plugin para manejo de archivos mediante fastify
fastify.register(fastifyMultipart, {
  attachFieldsToBody: true, 
  sharedSchemaId: 'uploadFile',
  limits: {
    files: 1 
  }
});

// Custom content-type parser for Excel files
// application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
fastify.addContentTypeParser('*', function (request, payload, done) {
  var data = ''
  payload.on('data', chunk => { data += chunk })
  payload.on('end', () => {
    done(null, data);
  })
})

// Auto cargar todas las routes para registrarlas en Swagger
fastify.register(fastifyAutoload, {
  dir: path.join(__dirname, 'routes')
})

// Agregar un parser de contenido para las solicitudes JSON
fastify.addContentTypeParser('application/json', { parseAs: 'string' }, (req, body, done) => {
  try {
      const json = JSON.parse(body);
      done(null, json);
  } catch (error) {
      error.statusCode = 400;
      done(error, undefined);
  }
}); 

// Escuchar en el puerto especificado
try {
  await fastify.listen({
    port: 8000,
    host: '0.0.0.0'
  }, (err, address) => {
    if (!err) {
      fastify.swagger();
      fastify.log.info(`Server listening at ${fastify.server.address().port}`);
      console.log(`Server listening at ${address}`);
    } else {
      console.log(err);
    }
  });
} catch (error) {
  fastify.log.error(error);
  process.exit(1);
}
