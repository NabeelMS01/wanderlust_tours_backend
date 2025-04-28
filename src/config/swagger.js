const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Basic Swagger Config
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Wanderlust Tours API',
      version: '1.0.0',
      description: 'API documentation for Wanderlust Tours Machine Test',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/**/*.js'], 
};

const specs = swaggerJsDoc(options);

module.exports = {
  swaggerUi,
  specs,
};
