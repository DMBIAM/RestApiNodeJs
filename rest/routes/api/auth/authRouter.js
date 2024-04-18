import boom from 'boom';

async function AuthRouter(fastify) {

    // Validador de formato de correo electrónico
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(String(email).toLowerCase());
    };

    // Middleware para validar el token JWT
    fastify.decorate('jwtauthenticate', async function (req, res) {
        try {
            await req.jwtVerify();
        } catch (error) {
            // Enviar un mensaje de error si el token no es válido
            res.status(401).send({ error: true, msg: "Invalid or expired JWT token" });
        }
    });


    /**
     * Genera un token de acceso para un usuario autenticado.
     * 
     * @route POST /api/v1/auth/generateAccessToken
     * @group Authentication - Autenticación de usuarios
     * @param {object} req.body.required - Objeto JSON que contiene los datos de usuario (email, userid, password).
     * @returns {object} 200 - Respuesta exitosa con un token de acceso y el email del usuario.
     * @returns {object} 400 - Respuesta de error con un mensaje indicando los errores de validación en los datos del usuario.
     * @returns {object} 500 - Respuesta de error interno del servidor.
     */
    fastify.post('/api/v1/auth/generateAccessToken', async function (req, res) {
        try {

            // Verificar si req.body está definido
            if (!req.body) {
                res.status(400).send({ error: true, msg: "Request body is missing" });
                return;
            }

            const { email, userid, password } = req.body;

            // Validar que los campos no estén vacíos
            if (!email || !userid || !password) {
                res.status(400).send({ error: true, msg: "Mandatory params are missing" });
                return;
            }

            // Validar el formato del correo electrónico
            if (!validateEmail(email)) {
                res.status(400).send({ error: true, msg: "Invalid email format" });
                return;
            }

            // Validar que el userid sea numérico
            if (isNaN(Number(userid))) {
                res.status(400).send({ error: true, msg: "Userid must be a number" });
                return;
            }

            // Validar la longitud del password
            if (password.length < 4 || password.length > 20) {
                res.status(400).send({ error: true, msg: "Password must be between 4 and 20 characters" });
                return;
            }

            // Generar token si todas las validaciones son superadas
            const token = fastify.jwt.sign({ email, userid, password }, { expiresIn: 26400 });
            res.status(200).send({ token, email });
        } catch (error) {
            throw boom.boomify(error);
        }
    });


    /**
     * Ruta para validar un token de autenticación JWT.
     * 
     * @route GET /api/v1/auth/validateToken
     * @group Authentication - Autenticación de usuarios
     * @security JWT
     * @returns {object} 200 - Respuesta exitosa con un mensaje indicando la autenticación exitosa.
     * @returns {object} 401 - Respuesta no autorizada si el token no es válido o no está presente.
     * @returns {object} 500 - Respuesta de error interno del servidor.
     */
    fastify.get('/api/v1/auth/validateToken', {
        preValidation: [fastify.jwtauthenticate]
    }, async (req, res) => {
        res.status(200).send({ msg: "Successfully authenticated" });
    });

}

export default AuthRouter;
