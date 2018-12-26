'use strict';

const precss = require('precss');
const autoprefixer = require('autoprefixer');

const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssPresetEnv = require('postcss-preset-env');
const postcssFlexBugsFixes = require('postcss-flexbugs-fixes');

const projectRoot = __dirname || process.cwd();

module.exports = {
  ident: 'postcss',
  syntax: 'postcss-scss',
  plugins: [
    postcssFlexBugsFixes,
    postcssImport({ root: projectRoot }),
    autoprefixer({ grid: true, flexbox: true }),
    postcssUrl({ useHash: true, hashOptions: 'xxhash64' }),
    postcssPresetEnv({ browsers: 'last 2 versions', stage: 0 }),
    precss,
  ],
}
