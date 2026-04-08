import { config } from '../config/index.js';

const openapiSpecification = {
  openapi: '3.0.0',
  info: {
    title: 'LMS Backend API',
    version: '1.0.0',
    description: 'API documentation for the LMS backend.',
  },
  servers: [
    {
      url: process.env.API_BASE_URL || `http://localhost:${config.port}`,
    },
  ],
  paths: {
    '/api/v1/health': {
      get: {
        summary: 'Health check',
        tags: ['Health'],
        responses: {
          200: {
            description: 'API is healthy.',
          },
        },
      },
    },
  },
};

export default openapiSpecification;
