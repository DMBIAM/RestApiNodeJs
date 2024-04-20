import boom from 'boom';
import AddEventsController  from '../../../controllers/events/addEventsController.js';
import GetAllEventsController  from '../../../controllers/events/getAllEventsController.js';
import GetOneEventsController  from '../../../controllers/events/getOneEventsController.js';
import UpdateEventsController from '../../../controllers/events/updateEventsController.js';
import DeleteEventsController from '../../../controllers/events/deleteEventsController.js';
import SearchNearestEventsController from '../../../controllers/events/searchNearestEventsController.js'; 
import AttendancePerDayEventsController from '../../../controllers/events/attendancePerDayEventsController.js'; 

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
                    location_name: { type: 'string' },
                    location: {
                        type: 'object',
                        properties: {
                            latitude: { type: 'number' },
                            longitude: { type: 'number' }
                        },
                        required: ['latitude', 'longitude']
                    }
                },
                required: ['name', 'city', 'location_name', 'location']
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
                    id: { type: 'number' },
                    location_name: { type: 'string' },
                    location: {
                        type: 'object',
                        properties: {
                            latitude: { type: 'number' },
                            longitude: { type: 'number' }
                        },
                        required: ['latitude', 'longitude']
                    }
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

    // Ruta para buscar el evento más cercano dada una coordenada
    fastify.get('/api/v1/events/searchNearest', { 
        preValidation: [fastify.jwtauthenticate],
        schema: {
            description: "Buscar el evento más cercano dada una coordenada.",
            tags: ['Events'],
            summary: 'Buscar el evento más cercano',
            security: [{ "bearerAuth": [] }],
            querystring: {
                type: 'object',
                properties: {
                    latitude: { type: 'number' },
                    longitude: { type: 'number' },
                    limit: { type: 'number' }
                },
                required: ['latitude', 'longitude']
            },
            response: {
                200: {
                    description: 'Successful response',
                    type: 'object',
                    properties: {
                        msg: { type: 'string' },
                        nearestEvent: {
                            type: 'object',
                            properties: {
                                status: { type: 'number' },
                                message: { type: 'string' },
                                data: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'number' },
                                            name: { type: 'string' },
                                            city_name: { type: 'string' },
                                            location: {
                                                type: 'object',
                                                properties: {
                                                    x: { type: 'number' },
                                                    y: { type: 'number' }
                                                }
                                            },
                                            distance: { type: 'number' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'Nearest event not found',
                    type: 'object',
                    properties: {
                        error: { type: 'boolean' },
                        msg: { type: 'string' }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    type: 'object',
                    properties: {
                        error: { type: 'boolean' },
                        msg: { type: 'string' }
                    }
                }
            }
        }
    }, async function (req, res) {  
        try {
            const searchNearestEvent = await SearchNearestEventsController.searchNearestEvent(req, res);
            return searchNearestEvent;
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

    // Ruta para calcular la cantidad de asistentes por día de la semana
    fastify.post('/api/v1/events/attendancePerDay', { 
        preValidation: [fastify.jwtauthenticate],
        schema: {
            description: "Cantidad de asistentes por día de la semana, para efecto del ejercicio el evento se celebra el dia que se crea el registro de asistencia de un usuario.",
            tags: ['Events'],
            summary: 'Calcular la cantidad de asistentes por día de la semana.',
            security: [{ "bearerAuth": [] }],
            body: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id_event: { type: 'number' },
                        date: { type: 'string', format: 'date' }
                    },
                    required: ['id_event', 'date']
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        msg: { type: 'string' },
                        attendancePerDay: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    date: { type: 'string', format: 'date' },
                                    day_of_week: { type: 'string' },
                                    attendance_count: { type: 'number' },
                                    event_id: { type: 'number' },
                                    event_name: { type: 'string' },
                                }
                            }
                        }
                    }
                },
                404: {
                    description: 'Nearest event not found',
                    type: 'object',
                    properties: {
                        error: { type: 'boolean' },
                        msg: { type: 'string' }
                    }
                },
                500: {
                    description: 'Internal Server Error',
                    type: 'object',
                    properties: {
                        error: { type: 'boolean' },
                        msg: { type: 'string' }
                    }
                }
            }
        }
    }, async function (req, res) {  
        try {
            const attendancePerDay = await AttendancePerDayEventsController.calculateAttendancePerDay(req.body, req, res);
            return attendancePerDay;
        } catch (error) {
            throw boom.boomify(error);
        }
    });

    
}

export default UsersRouter;