'use strict';

const path = require('path');
const htmlnano = require('htmlnano');
const posthtmlParser = require('posthtml-parser');
const posthtmlInclude = require('posthtml-include');

const configsRoot = __dirname || process.cwd();
const projectRoot = path.resolve(configsRoot, '..');

module.exports = {
  ident: 'posthtml',
  parser: posthtmlParser,
  plugins: [
    posthtmlInclude({ root: projectRoot }),
    htmlnano({ removeComments: true, collapseWhitespace: 'conservative' })
  ]
}
