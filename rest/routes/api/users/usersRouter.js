import boom from 'boom';

async function UsersRouter(fastify) {
    
    // Ruta de prueba
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
    
}

export default UsersRouter;