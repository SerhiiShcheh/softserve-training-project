import sass from 'node-sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import { readdirSync, mkdirSync, promises as fsPromises } from 'fs';
import { join as joinPath } from 'path';
import { cwd } from 'process';
import { promisify } from 'util';

// constants
const CURRENT_WORKING_DIR = cwd();
const SOURCE_DIR = joinPath(CURRENT_WORKING_DIR, './src/client/scss');
const OUTPUT_DIR = joinPath(CURRENT_WORKING_DIR, './public/css');

// tooling
const { writeFile } = fsPromises;
const renderSass = promisify(sass.render);
const postcssProcessor = postcss([
  autoprefixer,
]);

async function renderSassFile(sourcePath, destinationPath) {
  const sassRenderResult = await renderSass({
    file: sourcePath,
    includePaths: [SOURCE_DIR],
    outFile: destinationPath,
    outputStyle: 'compressed',
  });

  const postcssResult = await postcssProcessor.process(sassRenderResult.css, {
    from: sourcePath,
    to: destinationPath,
  });

  postcssResult.warnings().forEach(warning => {
    console.warn(warning.toString());
  });

  await writeFile(destinationPath, postcssResult.css, { encoding: 'utf8' });

  console.log(`Rendered "${sourcePath}" SCSS file!`);
}

// build process

console.log('Rendering SASS...');

mkdirSync(OUTPUT_DIR, { recursive: true });

const sourceDirEntries = readdirSync(SOURCE_DIR, {
  withFileTypes: true,
  encoding: 'utf8'
});

const scssFiles = sourceDirEntries
  .filter(entity => entity.isFile())
  .filter(entity => entity.name.endsWith('.scss'))
  .map(entity => entity.name);

const buildPromises = scssFiles.map(fileName => {
  const outputFileName = fileName.replace('.scss', '.css');
  return renderSassFile(
    joinPath(SOURCE_DIR, fileName),
    joinPath(OUTPUT_DIR, outputFileName)
  );
});

Promise.all(buildPromises)
  .then(() => console.log(`Rendered ${scssFiles.length} SCSS files!`))
  .catch(err => console.error(err));
