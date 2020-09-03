import express from 'express';
import multer from 'multer';
import { cwd } from 'process';
import { join as joinPath } from 'path';

const {
  UPLOADS_DIR = 'uploads'
} = process.env;

const CURRENT_WORKING_DIR = cwd();
const UPLOADS_DIRECTORY = joinPath(CURRENT_WORKING_DIR, UPLOADS_DIR);

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIRECTORY)
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`)
  },
});

export const jsonBodyParseMiddleware = express.json();

export const urlencodedBodyParseMiddleware = express.urlencoded({
  extended: true
});

export const uploadFileMiddleware = multer({
  storage: diskStorage
});
