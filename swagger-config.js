const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Quotes-Hyperskill API',
      version: '1.0.0',
      description: 'API documentation for quotes-hyperskill API',
    },
    servers: [
    {
      url: 'https://quotes-hyperskill.vercel.app/api/',
    	//url: '127.0.0.1:3000/api/',
    }]
  },
  components: {
    schemas: {
      Author: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
          birthdate: { type: 'string' },
          hint: { type: 'string' },
          bio: { type: 'string' },
        },
      },
      Quote: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          text: { type: 'string' },
          author_id: { type: 'integer' },
          tags: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
    },
  },
},
  apis: ['./controllers/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;