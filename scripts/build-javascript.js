import { minify } from 'terser';
import { readdirSync, mkdirSync, promises as fsPromises } from 'fs';
import { join as joinPath } from 'path';
import { cwd } from 'process';

// constants
const CURRENT_WORKING_DIR = cwd();
const SOURCE_DIR = joinPath(CURRENT_WORKING_DIR, './src/client/js');
const OUTPUT_DIR = joinPath(CURRENT_WORKING_DIR, './public/js');
const JS_FILE_ENDINGS = ['.js', '.cjs', '.mjs'];
const BUILD_OPTIONS = {
  warnings: true,
  ie8: false,
  toplevel: true,
  compress: {},
  mangle: {},
  nameCache: {},
  output: {
    beautify: false,
    indent_level: 2,
    preamble: '/* minified */',
    webkit: true,
  },
};

// tooling
const { readFile, writeFile } = fsPromises;

async function renderJavaScriptFile(sourcePath, destinationPath) {
  const fileContents = await readFile(sourcePath, 'utf8');
  const codeToBuild = { [sourcePath]: fileContents };
  const renderResult = await minify(codeToBuild, BUILD_OPTIONS);

  if (renderResult.error) {
    throw new SyntaxError(renderResult.error);
  }

  if (renderResult.warnings) {
    renderResult.warnings.forEach(warning => {
      console.log(`${sourceFilePath} ${warning}`);
    });
  }

  await writeFile(destinationPath, renderResult.code);

  console.log(`Rendered "${sourcePath}" JS file!`);
}

// build process

console.log('Rendering JavaScript...');

mkdirSync(OUTPUT_DIR, { recursive: true });

const sourceDirEntries = readdirSync(SOURCE_DIR, {
  withFileTypes: true,
  encoding: 'utf8'
});

const javaScriptFiles = sourceDirEntries
  .filter(entity => entity.isFile())
  .filter(entry => JS_FILE_ENDINGS.some(ending => entry.name.endsWith(ending)))
  .map(entity => entity.name);

const buildPromises = javaScriptFiles.map(fileName => {
  return renderJavaScriptFile(
    joinPath(SOURCE_DIR, fileName),
    joinPath(OUTPUT_DIR, fileName)
  );
});

Promise.all(buildPromises)
  .then(() => console.log(`Rendered ${javaScriptFiles.length} JS files!`))
  .catch(err => console.error(err));
