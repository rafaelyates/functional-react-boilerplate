'use strict';
/**
 * As this project uses typescript transpilation, then babel transpilation,
 * the formal jest configuration constraint wouldn't be able to handle it,
 * so this file picks the pipeline values and runs then sequentially.
 */
const transformPipeline = ['ts-jest', 'babel-jest'];

const process = (src, filename, config) => {
  return transformPipeline.reduce((acc, next) => {
    const mod = require(next);
    return mod.process(acc, filename, config);
  }, src);
};

module.exports = { process };
