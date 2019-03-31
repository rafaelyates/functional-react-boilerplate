'use strict';

module.exports = (api) => {
  api.cache(true);

  const nodeTarget = { node: 'current' };
  const transformModules = ['lodash', 'recompose'];

  return {
    presets: [
      ['@babel/preset-env', { targets: nodeTarget, useBuiltIns: 'entry' }],
      '@babel/preset-react',
      'backpack',
      'airbnb',
    ],
    plugins: [
      '@babel/plugin-syntax-import-meta',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-throw-expressions',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-function-sent',
      '@babel/plugin-proposal-async-generator-functions',
      '@babel/plugin-proposal-json-strings',
      '@babel/plugin-transform-destructuring',
      '@babel/plugin-transform-regenerator',
      '@babel/plugin-transform-react-display-name',
      '@babel/plugin-transform-react-constant-elements',
      '@babel/plugin-transform-block-scoping',
      '@babel/plugin-transform-runtime',
      ['lodash', { id: transformModules }],
      'dynamic-import-node',
      'react-require',
      'react-hot-loader/babel',
    ],
    sourceMaps: true,
    env: {
      production: {
        presets: ['minify'],
        plugins: ['@babel/plugin-transform-react-inline-elements', 'transform-react-remove-prop-types'],
        compact: true,
      },
      development: {
        plugins: ['@babel/plugin-transform-react-jsx-self', '@babel/plugin-transform-react-jsx-source'],
        compact: false,
      },
    },
  };
};
