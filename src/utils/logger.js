import winston from 'winston';
import DailyRotateFileTransport from 'winston-daily-rotate-file';

const {
  NODE_ENV = 'development',
  LOGS_DIR = 'logs',
  LOGS_ROTATION_PATTERN = 'YYYY-MM-DD',
  MAX_LOG_FILES = 7,
} = process.env;

const logger = winston.createLogger({
  level: 'verbose',
  format: winston.format.json(),
  exitOnError: false,
  transports: []
});

if (NODE_ENV === 'development') {
  const consoleTransport = new winston.transports.Console({
    handleExceptions: true,
    handleRejections: true,
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    ),
  });

  logger.add(consoleTransport);
} else {
  const fileRotationTransport = new DailyRotateFileTransport({
    datePattern: LOGS_ROTATION_PATTERN,
    filename: 'application-%DATE%.log',
    symlinkName: 'application-current.log',
    zippedArchive: true,
    dirname: LOGS_DIR,
    maxFiles: MAX_LOG_FILES,
    utc: true,
    createSymlink: true,
    handleExceptions: true,
    handleRejections: true,
  });

  logger.add(fileRotationTransport);
}

logger.stream = {
  write: (message, encoding) => {
    logger.http(message);
  },
};

export default logger;
