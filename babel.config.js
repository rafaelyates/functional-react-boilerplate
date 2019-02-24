'use strict';

module.exports = (api) => {
  api.cache(true);

  return ({
    presets: [
      "@babel/typescript",
      "@babel/preset-env",
      "@babel/preset-react",
      "airbnb"
    ],
    plugins: [
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-syntax-import-meta",
      "@babel/plugin-syntax-export-namespace-from",
      "@babel/plugin-syntax-throw-expressions"
    ],
    sourceMaps: true,
    compact: true
  });
}
