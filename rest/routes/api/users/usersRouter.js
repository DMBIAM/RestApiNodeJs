import boom from 'boom';

async function UsersRouter(fastify) {
    
    // Ruta de prueba
    fastify.get('/api/v1/users/getAll', { 
        preValidation: [fastify.jwtauthenticate] 
        }, async function (req, res) {  
        return { test : 'users'};
    });
    
}

export default UsersRouter;