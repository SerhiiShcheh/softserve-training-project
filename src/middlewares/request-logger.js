import morgan from 'morgan';
import logger from '../utils/logger.js';

const {
  NODE_ENV = 'development',
} = process.env;

let logFormat = ':remote-addr - :remote-user [:date[clf]] ' +
  '":method :url HTTP/:http-version" :status :res[content-length] ' +
  '":referrer" ":user-agent" - :response-time ms :total-time ms';

if (NODE_ENV === 'development') {
  logFormat = ':method :url :status :res[content-length] ' +
    '- response time: :response-time ms, total time: :total-time ms';
}

const loggingOptions = {
  stream: logger.stream,
};

export const requestLoggerMiddleware = morgan(logFormat, loggingOptions);
