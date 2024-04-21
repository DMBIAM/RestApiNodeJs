export const SwaggerOptions = {
    routePrefix: '/documentation',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Swagger ApiRest NodeJs',
        description: 'Swagger APIS',
        version: '1.0.0',
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here',
      },
      host: 'localhost:8000',
      schemes: ["http", "https"],
      consumes: ['application/json','multipart/form-data'],
      produces: ['application/json'],
      tags: [{ name: "Default", description: "Default" }],
      securityDefinitions: {
        bearerAuth: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'JWT Token',
        },
      },
      security: [{ bearerAuth: [] }],
    },
  };
  