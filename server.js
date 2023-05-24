import express from 'express';
import * as dotenv from 'dotenv';
import { setupRoutes } from './routes.js'

dotenv.config();

export const app = express();

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});

setupRoutes(app);
