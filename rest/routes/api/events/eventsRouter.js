import boom from 'boom';
import AddEventsController  from '../../../controllers/events/addEventsController.js';
import GetAllEventsController  from '../../../controllers/events/getAllEventsController.js';
import GetOneEventsController  from '../../../controllers/events/getOneEventsController.js';
import UpdateEventsController from '../../../controllers/events/updateEventsController.js';
import DeleteEventsController from '../../../controllers/events/deleteEventsController.js';

async function UsersRouter(fastify) {
    
    // Ruta para obtener todos los eventos
    fastify.get('/api/v1/events/getAll', { 
        preValidation: [fastify.jwtauthenticate],
        schema: {
            description: "Recuperar el listado completo de eventos.",
            tags: ['Events'],
            summary: 'Obtener listado de todos los eventos',
            security: [{ "bearerAuth": [] }]
        }
    }, async function (req, res) {  
        try {
            const getAllEvent = await GetAllEventsController.getAllEvent(req, res);
            return getAllEvent;
        } catch (error) {
            throw boom.boomify(error);
        }
    });

    // Ruta para obtener un evento por su ID
    fastify.get('/api/v1/events/getOne/:id', { 
        preValidation: [fastify.jwtauthenticate],
        schema: {
            description: "Recuperar un evento por su ID.",
            tags: ['Events'],
            summary: 'Obtener un evento por su ID',
            security: [{ "bearerAuth": [] }],
            params: {
                type: 'object',
                properties: {
                    id: { type: 'number' }
                },
                required: ['id']
            }
        }
    }, async function (req, res) {  
        try {
            const getOneEvent = await GetOneEventsController.getOneEvent(req, res);
            return getOneEvent;
        } catch (error) {
            throw boom.boomify(error);
        }
    });

    // Ruta para crear un nuevo evento
    fastify.post('/api/v1/events', { 
        preValidation: [fastify.jwtauthenticate],
        schema: {
            description: "Crear un nuevo evento.",
            tags: ['Events'],
            summary: 'Crear un nuevo evento',
            security: [{ "bearerAuth": [] }],
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    city: { type: 'number' },
                },
                required: ['name', 'city']
            }
        }
    }, async function (req, res) {  
        try {
            const addEvent = await AddEventsController.addEvent(req, res);
            return addEvent;
        } catch (error) {
            throw boom.boomify(error);
        }
    });

    // Ruta para actualizar un evento por su ID
    fastify.put('/api/v1/events', { 
        preValidation: [fastify.jwtauthenticate],
        schema: {
            description: "Actualizar un evento por su ID.",
            tags: ['Events'],
            summary: 'Actualizar un evento por su ID',
            security: [{ "bearerAuth": [] }],
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    city: { type: 'number' },
                    id: { type: 'number' }
                },
                required: ['id']
            }
        }
    }, async function (req, res) {  
        try {
            const updateEvent = await UpdateEventsController.updateEvent(req, res);
            return updateEvent;
        } catch (error) {
            throw boom.boomify(error);
        }
    });

    // Ruta para eliminar un evento por su ID
    fastify.delete('/api/v1/events', { 
        preValidation: [fastify.jwtauthenticate],
        schema: {
            description: "Eliminar un evento por su ID.",
            tags: ['Events'],
            summary: 'Eliminar un evento por su ID',
            security: [{ "bearerAuth": [] }],
            body: {
                type: 'object',
                properties: {
                    id: { type: 'number' }
                },
                required: ['id']
            }
        }
    }, async function (req, res) {  
        try {
            const deleteEvent = await DeleteEventsController.deleteEvent(req, res);
            return deleteEvent;
        } catch (error) {
            throw boom.boomify(error);
        }
    });
    
}

export default UsersRouter;