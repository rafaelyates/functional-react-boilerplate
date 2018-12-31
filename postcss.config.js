'use strict';

const precss = require('precss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

const postcssScss = require('postcss-scss');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssPresetEnv = require('postcss-preset-env');
const postcssFlexBugsFixes = require('postcss-flexbugs-fixes');

const projectRoot = __dirname || process.cwd();

module.exports = {
  ident: 'postcss',
  parser: postcssScss,
  plugins: [
    postcssFlexBugsFixes,
    postcssImport({ root: projectRoot }),
    autoprefixer({ grid: true, flexbox: true }),
    postcssUrl({ useHash: true, hashOptions: 'xxhash64' }),
    postcssPresetEnv({ browsers: 'last 2 versions', stage: 0 }),
    cssnano({ preset: 'default', discardUnused: true }),
    precss,
  ],
}
