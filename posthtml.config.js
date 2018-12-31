'use strict';

const htmlnano = require('htmlnano');
const posthtmlParser = require('posthtml-parser');
const posthtmlInclude = require('posthtml-include');

const projectRoot = __dirname || process.cwd();

module.exports = {
  ident: 'posthtml',
  parser: posthtmlParser,
  plugins: [
    posthtmlInclude({ root: projectRoot }),
    htmlnano({ removeComments: true, collapseWhitespace: 'conservative' })
  ]
}
