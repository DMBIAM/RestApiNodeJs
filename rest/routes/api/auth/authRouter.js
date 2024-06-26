import boom from 'boom';

async function AuthRouter(fastify) {

    // Validador de formato de correo electrónico
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(String(email).toLowerCase());
    };

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
    fastify.post('/api/v1/auth/generateAccessToken', {
        schema: {
            tags: ['Authentication'],
            summary: 'Genera un token de acceso para un usuario autenticado',
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string', format: 'email' },
                    userid: { type: 'number' },
                    password: { type: 'string', minLength: 4, maxLength: 20 }
                },
                required: ['email', 'userid', 'password']
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' },
                        email: { type: 'string' }
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        error: { type: 'boolean' },
                        msg: { type: 'string' }
                    }
                },
                500: {
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

            // Comparar con las variables de entorno
            const { AUTH_EMAIL, AUTH_USERID, AUTH_PASSWORD } = process.env;
            if (email !== AUTH_EMAIL || Number(userid) !== Number(AUTH_USERID) || password !== AUTH_PASSWORD) {
                res.status(401).send({ error: true, msg: "Invalid credentials" });
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
        preValidation: [fastify.jwtauthenticate],
        schema: {
            description: "Ruta para validar un token de autenticación JWT.",
            tags: ['Authentication'],
            summary: 'Validar token JWT',
            security: [{ "bearerAuth": [] }]
        }

    }, async (req, res) => {
        try {
            res.status(200).send({ msg: "Successfully authenticated" });
        } catch (error) {
            throw boom.boomify(error);
        }
    });
}

export default AuthRouter;
