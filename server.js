import express from 'express';
import * as dotenv from 'dotenv';
import { setupRoutes } from './routes.js'

dotenv.config();

export const app = express();

app.listen(3030, () => {
  console.log(`Server is running on port 3030`);
});

setupRoutes(app);
