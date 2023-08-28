const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger.json';
//const endpointsFiles = ['./routes/*.js'];
const endpointsFiles = ['server.js'];

const config = {
    info: {
        title: 'Blog API Documentation',
        description: '',
    },
    tags: [ ],
    host: 'localhost:9000',
    schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endpointsFiles, config);