import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createLogger } from '../services/logger.js';
import logRoutes from '../routes/logRoutes.js';

dotenv.config();

const app = express();
const logger = createLogger(process.env.MONGO_URI);
app.locals.logger = logger;

app.use(cors());

app.use('/logs', logRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.use((req, res, next) => {
  if (req.originalUrl.startsWith('/logs')) {
    return res.status(404).json({ error: 'Not found' });
  }

  res.sendFile(path.join(publicPath, 'index.html'));
});

export { app, logger };
