'use strict';
/**
 * As postcss only allows the usage of one parser, this hack allows
 * the usage of multiple parser.
 */
const transformPipeline = ['postcss-scss', 'postcss-safe-parser'];

const parse = (style, options) => {
  return transformPipeline.reduce((acc, next) => {
    const mod = require(next);
    const parser = mod.parse ? mod.parse : mod;
    return parser(acc, options);
  }, style);
};

module.exports = { parse };
