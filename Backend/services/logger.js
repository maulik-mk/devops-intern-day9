import winston from 'winston';
import 'winston-mongodb';

export const createLogger = (mongoUri) => {
  return winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.MongoDB({
        db: mongoUri,
        options: {},
        collection: 'logs',
        tryReconnect: true,
        format: winston.format.json(),
      })
    ]
  });
};
