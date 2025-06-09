import mongoose from 'mongoose';

export const rootHandler = (req, res) => {
  req.app.locals.logger.info('Root endpoint was hit');
  res.send('Hello, DevOps Intern Day 3');
};

export const getLogs = async (req, res) => {
  try {
    const logs = await mongoose.connection.db
      .collection('logs')
      .find({ level: 'info' })
      .sort({ timestamp: -1 })
      .limit(50)
      .toArray();

    res.json(logs);
  } catch (error) {
    req.app.locals.logger.error('Error fetching logs', error);
    res.status(500).json({ error: 'Could not fetch logs' });
  }
};
