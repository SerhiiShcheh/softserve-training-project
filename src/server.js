import logger from './utils/logger.js';
import { createServer as createHttpServer } from 'http';
import { application } from './application.js';

const {
  SERVER_LISTEN_PORT = 3000
} = process.env;

let httpServer = null;

try {
  httpServer = createHttpServer(application);
  httpServer.listen(SERVER_LISTEN_PORT);
  logger.info(`HTTP Server started listening on port ${SERVER_LISTEN_PORT}`);
  logger.info(`You can see the application on http://localhost:${SERVER_LISTEN_PORT}`);
} catch (err) {
  logger.error(err);
  process.exit(1);
}

function doGracefulShutdown() {
  httpServer?.close(err => {
    if (err) {
      logger.error(err);
      return process.exit(1);
    }

    logger.info('Server gracefully stopped');
    logger.once('finish', () => process.exit(0));
    logger.end();
  });
}

process.once('SIGUSR2', doGracefulShutdown);
process.once('SIGINT', doGracefulShutdown);
process.once('SIGTERM', doGracefulShutdown);
