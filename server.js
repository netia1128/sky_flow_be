import express from 'express';
import * as dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { setupRoutes } from './routes.js';

dotenv.config();

// Set up app
export const app = express();

// Set up swagger
const swaggerDefinition = {
  info: {
    title: `Skyflow Swagger`,
    host: 'localhost:3030'
  }
};

const options = {
  swaggerDefinition,
  apis: ['./swagger.yaml']
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Boot up server

app.listen(3030, () => {
  console.log(`Server is running on port 3030`);
});

// Attach routes

setupRoutes(app);
