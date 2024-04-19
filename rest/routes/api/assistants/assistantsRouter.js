import boom from 'boom';
// import AddAssistantsController  from '../../../controllers/assistants/addAssistantsController.js';
import GetAllAssistantsController  from '../../../controllers/assistants/getAllAssistantsController.js';


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
    
}

export default AssistantsRouter;