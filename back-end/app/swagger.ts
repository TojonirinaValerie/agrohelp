import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
import path from 'path';
import { OpenAPIV3 } from 'openapi-types';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Agrohelp Consulting API",
      version: "1.0",
      description: "By Miandrs in Tech-Nova",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: `http://localhost:8000/api`, // Change based on your environment
      },
    ],
  },
  // ✅ DO THIS: Point to the actual route files (*.ts)
  apis: [path.resolve(__dirname, './routes/*.ts')],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions) as OpenAPIV3.Document;

export const setupSwagger = (app: Application) => {
  //console.log('📄 Swagger Paths:', Object.keys(swaggerSpec.paths || {}));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
