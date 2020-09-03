import express from 'express';
import { registerRouteHandlers } from './routing.js';
import { handlebarsEngine, VIEWS_DIRECTORY } from './middlewares/templates-engine.js';
import { serveStaticMiddleware } from './middlewares/serve-static.js';
import { requestLoggerMiddleware } from './middlewares/request-logger.js';
import { internationalizationMiddleware } from './middlewares/internationalization.js';
import { setupLocaleMiddleware } from './middlewares/setup-locale.js';
import { compressionMiddleware } from './middlewares/compression.js';
import { errorsHandlerMiddleware } from './middlewares/errors-handler.js'
import {
  jsonBodyParseMiddleware,
  urlencodedBodyParseMiddleware,
} from './middlewares/request-body-parse.js';

export const application = express();

const applicationRouter = express.Router({
  mergeParams: true,
});

// enable escaping JSON responses (<, >, and & as Unicode escape sequences)
application.set('json escape', true);

// disable query parsing
application.set('query parser', false);

// disable strict routing
application.set('strict routing', false);

// disable "X-Powered-By: Express" header
application.set('x-powered-by', false);

// Handlebars templates engine connect
application.engine('hbs', handlebarsEngine);
application.set('views', VIEWS_DIRECTORY);
application.set('view engine', 'hbs');

// Setup other request middlewares
application.use(
  serveStaticMiddleware,
  jsonBodyParseMiddleware,
  urlencodedBodyParseMiddleware,
  requestLoggerMiddleware,
  internationalizationMiddleware,
  compressionMiddleware,
);

/**
 * Route handlers (also middlewares in Express.js) should be registered after
 * setting up common request middleware (middlewares that should work on each
 * request), but before setting up errors handling middlewares
 */
registerRouteHandlers(applicationRouter);

/**
 * Apply optional locale provided in the URL to the request parameters and
 * pass control over to the application router to process request with the
 * specific controller
 */
application.use('/:locale([a-z]{2})?', setupLocaleMiddleware, applicationRouter);

// Setup errors handling middleware (should always be last registered)
application.use(errorsHandlerMiddleware);
