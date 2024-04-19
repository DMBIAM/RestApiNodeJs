import boom from 'boom';
import AddUsersController  from '../../../controllers/users/addUsersController.js';

async function UsersRouter(fastify) {
    
    // Ruta para obtener todos los usuarios
    fastify.get('/api/v1/users/getAll', { 
        preValidation: [fastify.jwtauthenticate],
        schema: {
            description: "Recuperar el listado completo de usuarios.",
            tags: ['Users'],
            summary: 'Obtener listado de todos los usuarios',
            security: [{ "bearerAuth": [] }]
        }
    }, async function (req, res) {  
        try {
            res.status(200).send({ msg: "Show All users" });
        } catch (error) {
            throw boom.boomify(error);
        }
    });

    // Ruta para obtener un usuario por su ID
    fastify.get('/api/v1/users/getOne/:id', { 
        preValidation: [fastify.jwtauthenticate],
        schema: {
            description: "Recuperar un usuario por su ID.",
            tags: ['Users'],
            summary: 'Obtener un usuario por su ID',
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
            // TODO GET USER BY ID
            const userId = req.params.id;
            res.status(200).send({ msg: `Show user with ID ${userId}` });
        } catch (error) {
            throw boom.boomify(error);
        }
    });

    // Ruta para crear un nuevo usuario
    fastify.post('/api/v1/users', { 
        preValidation: [fastify.jwtauthenticate],
        schema: {
            description: "Crear un nuevo usuario.",
            tags: ['Users'],
            summary: 'Crear un nuevo usuario',
            security: [{ "bearerAuth": [] }],
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                },
                required: ['name', 'email']
            }
        }
    }, async function (req, res) {  
        try {
            const newUser = await AddUsersController.addUser(req);
            res.status(201).send({ msg: "New user created", newUser });
        } catch (error) {
            throw boom.boomify(error);
        }
    });

    // Ruta para actualizar un usuario por su ID
    fastify.put('/api/v1/users/:id', { 
        preValidation: [fastify.jwtauthenticate],
        schema: {
            description: "Actualizar un usuario por su ID.",
            tags: ['Users'],
            summary: 'Actualizar un usuario por su ID',
            security: [{ "bearerAuth": [] }],
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                }
            },
            body: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                    id: { type: 'number' }
                },
                required: ['id']
            }
        }
    }, async function (req, res) {  
        try {
            const userId = req.params.id;
            const userData = req.body;
            // TODO USER UPDATE
            res.status(200).send({ msg: `User with ID ${userId} updated`, userData });
        } catch (error) {
            throw boom.boomify(error);
        }
    });

    // Ruta para eliminar un usuario por su ID
    fastify.delete('/api/v1/users/:id', { 
        preValidation: [fastify.jwtauthenticate],
        schema: {
            description: "Eliminar un usuario por su ID.",
            tags: ['Users'],
            summary: 'Eliminar un usuario por su ID',
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
            const userId = req.params.id;
            // TODO DELETED USER
            res.status(200).send({ msg: `User with ID ${userId} deleted` });
        } catch (error) {
            throw boom.boomify(error);
        }
    });
    
}

export default UsersRouter;