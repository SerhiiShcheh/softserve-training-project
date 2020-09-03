import * as indexController from './controllers/index.js';
import * as healthCheckController from './controllers/health-check.js';
import * as apiStatusController from './controllers/api/status.js';

export const registerRouteHandlers = (application) => {
  application.get('/', indexController.get);
  application.get('/ping', healthCheckController.get);
};

export const registerApiEndpointsHandlers = (application) => {
  application.get('/', apiStatusController.get);
};
