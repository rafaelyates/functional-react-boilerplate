'use strict';

module.exports = (api) => {
  api.cache(true);

  return ({
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      'backpack',
      'airbnb'
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-syntax-import-meta',
      '@babel/plugin-syntax-export-namespace-from',
      '@babel/plugin-syntax-throw-expressions',
      '@babel/plugin-syntax-object-rest-spread',
      '@babel/plugin-syntax-json-strings',
      'dynamic-import-node',
      'react-require',
      'lodash'
    ],
    sourceMaps: true,
    env: {
      production: {
        presets: [
          'minify',
        ],
        plugins: [
          '@babel/plugin-transform-react-inline-elements',
          '@babel/plugin-transform-react-constant-elements',
          'transform-react-remove-prop-types'
        ],
        compact: true
      }
    }
  });
}
