import { app, logger } from './src/main.js';
import { connectDB } from './DataBase/connectDB.js';

const port = process.env.PORT || 3000;

connectDB()
  .then(() => {
    logger.info('MongoDB connected');
    app.listen(port, () => {
      logger.info(`Server running on http://localhost:${port}`);
    });
  })
  .catch(error => {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  });
