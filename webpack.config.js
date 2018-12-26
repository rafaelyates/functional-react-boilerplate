'use strict';

const path = require('path');
const glob = require('glob-all');
const cssnano = require('cssnano');
const posthtmlParser = require('posthtml-parser');

const {
  NoEmitOnErrorsPlugin,
  NamedModulesPlugin,
  SourceMapDevToolPlugin,
  HashedModuleIdsPlugin,
  HotModuleReplacementPlugin
} = require('webpack');

const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HappyPack = require('happypack');

const AssetsPlugin = require('assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');

const CircularDependencyPlugin = require('circular-dependency-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const packageJson = require('./package.json');
const projectRoot = __dirname || process.cwd();
const sourcesRoot = path.join(projectRoot, 'src');
const destination = path.join(projectRoot, 'dist');
const nodeModules = path.join(projectRoot, 'node_modules');
const entryPoints = ['inline', 'polyfills', 'sw-register', 'styles', 'scripts', 'vendor', 'main'];
const excludePath = /node_modules/;

module.exports = (env, argv) => {
  const isDevMode = (argv.mode === 'development');

  const scssLoaders = (isModular) => [
    {
      loader: require.resolve('css-loader'),
      options: {
        modules: isModular,
        minimize: true,
        sourceMap: isDevMode,
        localIdentName: isDevMode ? '[name]_[local]' : '[hash:base64]',
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: { sourceMap: isDevMode }
    },
    {
      loader: require.resolve('resolve-url-loader'),
      options: { sourceMap: isDevMode }
    },
    {
      loader: require.resolve('sass-loader'),
      options: { sourceMap: isDevMode }
    }
  ];

  const minimizers = [
    new TerserPlugin({
      cache: true,
      sourceMap: isDevMode,
      extractComments: false,
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        parse: { bare_returns: true },
        compress: { warnings: false, comparisons: true },
        output: { comments: false, ascii_only: true },
      },
      cache: true,
      sourceMap: isDevMode,
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      canPrint: true
    }),
    new PurifyCSSPlugin({
      paths: glob.sync([
        path.join(sourcesRoot, '*.html')
      ]),
      minimize: true,
      styleExtensions: ['.scss'],
      moduleExtensions: ['.html'],
    }),
  ];

  const icons = [
    {
      src: path.join(sourcesRoot, 'favicon.ico'),
      sizes: [16, 24, 32, 64],
      type: 'image/x-icon',
      destination: path.join('static', 'icons'),
    },
  ];

  return ({
    bail: !isDevMode,
    devtool: isDevMode ? 'inline-source-map' : 'source-map',
    entry: {
      main: [path.join(sourcesRoot, 'main.tsx')],
      polyfills: [path.join(sourcesRoot, 'polyfills.ts')],
      styles: [path.join(sourcesRoot, 'styles.scss')]
    },
    output: {
      path: destination,
      filename: 'static/js/[name].[hash:8].bundle.js',
      sourceMapFilename: 'static/js/[name].[hash:8].source.map',
      chunkFilename: 'static/js/chunks/[id].[hash:8].chunk.js',
      crossOriginLoading: false,
      pathinfo: true,
    },
    devServer: {
      port: 4200,
      inline: true,
      compress: true,
      historyApiFallback: true,
      watchContentBase: true
    },
    stats: {
      colors: true,
      errorDetails: true
    },
    performance: {
      hints: false
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.html', '.css', '.scss', '.json'],
      modules: [
        sourcesRoot,
        nodeModules
      ],
      mainFields: ['browser', 'module', 'main'],
      symlinks: true,
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.join(projectRoot, 'tsconfig.json'),
        }),
        new DirectoryNamedWebpackPlugin(true)
      ]
    },
    resolveLoader: {
      modules: [
        nodeModules,
      ],
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.jsx?$/,
          exclude: excludePath,
          enforce: 'pre',
          use: [
            { loader: require.resolve('source-map-loader') }
          ]
        },
        {
          test: /\.tsx?$/,
          exclude: excludePath,
          use: [
            {
              loader: require.resolve('react-hot-loader/webpack'),
              options: { sourceMap: isDevMode },
            },
            {
              loader: require.resolve('happypack/loader'),
              options: { id: 'typescript' },
            }
          ]
        },
        {
          test: /\.html$/,
          exclude: excludePath,
          use: [
            { loader: require.resolve('html-loader') },
            {
              loader: require.resolve('posthtml-loader'),
              options: { ident: 'posthtml', parser: posthtmlParser }
            },
          ]
        },
        {
          test: /\.json$/,
          use: [
            { loader: require.resolve('json-loader') }
          ]
        },
        {
          test: /\.(jpg|jpe|gif|png|ico|svg|bmp|webp)$/,
          use: [
            { loader: require.resolve('url-loader') },
            {
              loader: require.resolve('image-webpack-loader'),
              options: { disable: isDevMode },
            },
          ]
        },
        {
          test: /\.(ani|cur|eot|otf|ttf|woff|woff2)$/,
          use: [
            {
              loader: require.resolve('file-loader'),
              options: { name: 'static/media/[name].[hash:8].[ext]' },
            },
          ]
        },
        {
          test: /\.scss$/,
          exclude: /\.module\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { sourceMap: isDevMode },
            },
            {
              loader: require.resolve('happypack/loader'),
              options: { id: 'style-simple' },
            }
          ]
        },
        {
          test: /\.module\.scss$/,
          use: [
            {
              loader: isDevMode ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
              options: { sourceMap: isDevMode },
            },
            {
              loader: require.resolve('happypack/loader'),
              options: { id: 'style-module' },
            }
          ]
        },
      ]
    },
    optimization: {
      namedModules: true,
      moduleIds: 'hashed',
      minimize: !isDevMode,
      minimizer: isDevMode ? [] : minimizers,
    },
    plugins: [
      new NoEmitOnErrorsPlugin(),
      new HotModuleReplacementPlugin(),
      new SourceMapDevToolPlugin({
        filename: '[file].map[query]',
        moduleFilenameTemplate: '[resource-path]',
        fallbackModuleFilenameTemplate: '[resource-path]?[hash:8]',
        sourceRoot: 'webpack:///'
      }),
      new CircularDependencyPlugin({
        exclude: excludePath,
        failOnError: false,
        onDetected: false,
        cwd: projectRoot
      }),
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[hash:8].style.css',
        chunkFilename: 'static/css/chunks/[id].[hash:8].chunk.css'
      }),
      new HappyPack({
        id: 'style-simple',
        loaders: scssLoaders(false),
      }),
      new HappyPack({
        id: 'style-module',
        loaders: scssLoaders(true),
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(sourcesRoot, 'index.html'),
        favicon: path.join(sourcesRoot, 'favicon.ico'),
        hash: false,
        inject: true,
        compile: true,
        cache: true,
        xhtml: true,
        chunksSortMode: (left, right) => {
          const leftIndex = entryPoints.indexOf(left.names[0]);
          const rightIndex = entryPoints.indexOf(right.names[0]);
          return leftIndex > rightIndex ?  1
              :  leftIndex < rightIndex ? -1
                                        :  0;
        }
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
      }),
      new AssetsPlugin({
        path: destination,
        prettyPrint: true,
        includeManifest: true,
      }),
      new HashedModuleIdsPlugin({
        hashFunction: 'sha256',
        hashDigest: 'base64',
        hashDigestLength: 20
      }),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
      }),
      new SWPrecacheWebpackPlugin({
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: true,
        mergeStaticsConfig: true,
        navigateFallback: path.join(destination, 'index.html'),
        navigateFallbackWhitelist: [/^(?!\/__).*/],
        staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
      }),
      new WebpackPwaManifest({
        filename: 'manifest.json',
        name: packageJson.name,
        description: packageJson.description,
        inject: true,
        fingerprints: true,
        crossorigin: 'use-credentials',
        start_url: './',
        display: 'standalone',
        theme_color: '#000000',
        background_color: '#ffffff',
        icons: isDevMode ? [] : icons,
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false,
        tsconfig: path.join(projectRoot, 'tsconfig.json'),
        tslint: !isDevMode,
        checkSyntacticErrors: true
      }),
      new HappyPack({
        id: 'typescript',
        loaders: [
          { loader: require.resolve('babel-loader') },
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true,
              happyPackMode: true,
            }
          },
        ]
      }),
      new CaseSensitivePathsPlugin(),
      new NamedModulesPlugin(),
    ],
    node: {
      __filename: true,
      __dirname: true,
      global: false,
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false,
      console: true,
      dgram: 'empty',
      fs: 'empty',
      crypto: 'empty',
      tls: 'empty',
      net: 'empty',
      child_process: 'empty',
    },
  });
}
