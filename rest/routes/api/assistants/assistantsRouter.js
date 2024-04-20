import boom from 'boom';
// import AddAssistantsController  from '../../../controllers/assistants/addAssistantsController.js';
import GetAllAssistantsController  from '../../../controllers/assistants/getAllAssistantsController.js';
import SearchAssistantsController from '../../../controllers/assistants/searchAssistantsControllers.js';


async function AssistantsRouter(fastify) {

    // Ruta para obtener todos los asistentes
    fastify.get('/api/v1/assistants/getAll', { 
        preValidation: [fastify.jwtauthenticate],
        schema: {
            description: "Recuperar el listado completo de asistentes.",
            tags: ['Assistants'],
            summary: 'Obtener listado de todos los asistentes',
            security: [{ "bearerAuth": [] }],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        msg: { type: 'string' },
                        assistants: {
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
                                            user_name: { type: 'string' },
                                            user_email: { type: 'string' },
                                            event_name: { type: 'string' },
                                            city_name: { type: 'string' },
                                            country_name: { type: 'string' },
                                            created_at: { type: 'string', format: 'date-time' },
                                            updated_at: { type: 'string', format: 'date-time' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, async function (req, res) {  
        try {
            const getAllAssistants = await GetAllAssistantsController.getAllAssistant(req, res);
            return getAllAssistants;
        } catch (error) {
            throw boom.boomify(error);
        }
    });

    fastify.get('/api/v1/assistants/search', { 
        preValidation: [fastify.jwtauthenticate],
        schema: {
            description: "Buscar asistentes por diferentes criterios, las propiedades que se observan aquí, podrán ser utilizadas como parámetro de búsqueda, se debe enviar por lo menos un parámetro.",
            tags: ['Assistants'],
            summary: 'Buscar asistentes',
            security: [{ "bearerAuth": [] }],
            querystring: {
                type: 'object',
                properties: {
                    user_name: { type: 'string' },
                    user_id: { type: 'integer' },
                    user_email: { type: 'string' },
                    event_id: { type: 'integer' },
                    event_name: { type: 'string' },
                    city_id: { type: 'integer' },
                    city_name: { type: 'string' },
                    country_id: { type: 'integer' },
                    country_name: { type: 'string' }
                },
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        msg: { type: 'string' },
                        assistants: {
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
                                            user_name: { type: 'string' },
                                            user_email: { type: 'string' },
                                            event_id: { type: 'number' },
                                            event_name: { type: 'string' },                                            
                                            city_name: { type: 'string' },
                                            country_name: { type: 'string' },
                                            created_at: { type: 'string', format: 'date-time' },
                                            updated_at: { type: 'string', format: 'date-time' }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }, async function (req, res) {  
        try {
            const { user_name, user_id, user_email, event_id, event_name, city_id, city_name, country_id, country_name } = req.query;
            const searchResult = await SearchAssistantsController.searchAssistants(req, res, { user_name, user_id, user_email, event_id, event_name, city_id, city_name, country_id, country_name });
            return searchResult;
        } catch (error) {
            throw boom.boomify(error);
        }
    });
    
    
}

export default AssistantsRouter;