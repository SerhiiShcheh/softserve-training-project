import express from 'express';
import { cwd } from 'process';
import { join as joinPath } from 'path';

const {
  PUBLIC_DIR = 'public'
} = process.env;

const CURRENT_WORKING_DIR = cwd();
const PUBLIC_DIRECTORY = joinPath(CURRENT_WORKING_DIR, PUBLIC_DIR);

export const serveStaticMiddleware = express.static(PUBLIC_DIRECTORY, {
  dotfiles: 'ignore',
  etag: false,
  index: false,
});
