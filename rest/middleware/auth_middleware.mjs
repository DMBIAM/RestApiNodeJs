import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin(async function (fastify) {
    fastify.decorate('jwtauthenticate', async function (req, res) {
        try {
            await req.jwtVerify();
        } catch (error) {
            res.status(401).send({ error: true, msg: "Invalid or expired JWT token" });
        }
    });
});

