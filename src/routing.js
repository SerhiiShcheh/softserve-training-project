import * as indexController from './controllers/index.js';
import * as healthCheckController from './controllers/health-check.js';

export const registerRouteHandlers = (application) => {
  application.get('/', indexController.get);
  application.get('/ping', healthCheckController.get);
};
