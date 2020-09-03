import logger from '../utils/logger.js';

const {
  NODE_ENV = 'development'
} = process.env;

export const errorsHandlerMiddleware = (err, req, res, next) => {
  if (NODE_ENV === 'development') {
    console.log();
    console.error(err);
    console.log();
  }

  logger.error(err);
  if (res.headersSent) return next(err);
  res.status(500).end(err);
};
