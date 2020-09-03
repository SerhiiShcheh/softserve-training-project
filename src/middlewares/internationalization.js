import i18n from 'i18n';
import logger from '../utils/logger.js';
import { cwd } from 'process';
import { join as joinPath } from 'path';

const {
  LOCALES_DIR = 'locales'
} = process.env;

const CURRENT_WORKING_DIR = cwd();
const LOCALES_DIRECTORY = joinPath(CURRENT_WORKING_DIR, LOCALES_DIR);

const logDebugFn = (...args) => logger.debug(...args);
const logWarnFn = (...args) => logger.warn(...args);
const logErrorFn = (...args) => logger.error(...args);
const missingKeyFn = (locale, value) => {
  logger.warn(`Missing key "${value}" for locale "${locale}"`);
  return value;
};

i18n.configure({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  directory: LOCALES_DIRECTORY,
  directoryPermissions: '755',
  autoReload: false,
  updateFiles: false,
  syncFiles: true,
  logDebugFn,
  logWarnFn,
  logErrorFn,
  missingKeyFn,
  api: {
    '__': 'translate',
    '__n': 'pluralize',
  },
});

export const internationalizationMiddleware = i18n.init;
