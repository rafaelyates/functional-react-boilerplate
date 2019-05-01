'use strict';

module.exports = (api) => {
  api.cache(true);

  const nodeTarget = { node: 'current' };
  const transformModules = ['lodash', 'recompose', 'async'];

  return {
    presets: [['@babel/preset-env', { targets: nodeTarget }], '@babel/preset-react', 'backpack', 'airbnb'],
    plugins: [
      ['@babel/plugin-syntax-typescript', { isTSX: true }],
      '@babel/plugin-syntax-jsx',
      '@babel/plugin-syntax-import-meta',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-transform-react-display-name',
      '@babel/plugin-transform-react-constant-elements',
      '@babel/plugin-transform-async-to-generator',
      ['lodash', { id: transformModules }],
      'react-require',
      'react-intl',
      'dynamic-import-node',
      'extract-hoc/babel',
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
