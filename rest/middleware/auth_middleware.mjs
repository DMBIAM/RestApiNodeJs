import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin(async function (fastify){
    fastify.decorate('jwtauthenticate', async function (req, res){
        try {
            await req.jwtVerify();
        } catch (error) {
            res.send(error);
        }
    })

})