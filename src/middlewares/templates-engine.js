import expressHandlebars from 'express-handlebars';
import { cwd } from 'process';
import { join as joinPath } from 'path';

const {
  LAYOUTS_VIEWS_DIR = 'layouts',
  VIEWS_DIR = 'pages'
} = process.env;

const CURRENT_WORKING_DIR = cwd();
const LAYOUTS_DIRECTORY = joinPath(CURRENT_WORKING_DIR, LAYOUTS_VIEWS_DIR);
export const VIEWS_DIRECTORY = joinPath(CURRENT_WORKING_DIR, VIEWS_DIR);

const hbs = expressHandlebars.create({
  partialsDir: [VIEWS_DIRECTORY],
  layoutsDir: LAYOUTS_DIRECTORY,
  defaultLayout: 'base',
  extname: '.hbs',
});

export const handlebarsEngine = hbs.engine;
