import logger from './utils/logger.js';
import orm from './utils/orm.js';
import { createServer as createHttpServer } from 'http';
import { application } from './application.js';

const { SERVER_LISTEN_PORT = 3000 } = process.env;

let httpServer = null;

async function serverStart() {
  try {
    await orm.initialize();
    httpServer = createHttpServer(application);
    httpServer.listen(SERVER_LISTEN_PORT);
    logger.info(`HTTP Server started listening on port ${SERVER_LISTEN_PORT}`);
    logger.info(
      `You can see the application on http://localhost:${SERVER_LISTEN_PORT}`
    );
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

function serverGracefulShutdown() {
  httpServer?.close(err => {
    if (err) {
      logger.error(err);
      return process.exit(1);
    }

    orm.shutdown().then(() => {
      logger.info('Server gracefully stopped');
      logger.once('finish', () => process.exit(0));
      logger.end();
    });
  });
}

process.once('SIGUSR2', serverGracefulShutdown);
process.once('SIGINT', serverGracefulShutdown);
process.once('SIGTERM', serverGracefulShutdown);

serverStart();
