import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createLogger } from '../services/logger.js';
import logRoutes from '../routes/logRoutes.js';

dotenv.config();

const app = express();
const logger = createLogger(process.env.MONGO_URI);
app.locals.logger = logger;

app.use(cors());
app.use('/logs', logRoutes);

export { app, logger };
