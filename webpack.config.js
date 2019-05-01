'use strict';

const path = require('path');
const glob = require('glob-all');

const sass = require('sass');
const fibers = require('fibers');
const cleanCss = require('clean-css');

const {
  NoEmitOnErrorsPlugin,
  NamedModulesPlugin,
  SourceMapDevToolPlugin,
  HashedModuleIdsPlugin,
  HotModuleReplacementPlugin,
} = require('webpack');

const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const DirectoryNamedWebpackPlugin = require('directory-named-webpack-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HappyPack = require('happypack');

const Dotenv = require('dotenv-webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const CircularDependencyPlugin = require('circular-dependency-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');

const isDevMode = process.env.NODE_ENV === 'development';
const projectRoot = __dirname || process.cwd();

const sourcesRoot = path.join(projectRoot, 'src');
const destination = path.join(projectRoot, 'dist');
const configsRoot = path.join(projectRoot, 'config');
const nodeModules = path.join(projectRoot, 'node_modules');
const dotEnvFiles = path.join(projectRoot, 'env');

const typesConfig = path.join(projectRoot, 'tsconfig.json');
const babelConfig = path.join(projectRoot, 'babel.config.js');
const packageFile = path.join(projectRoot, 'package.json');

const envDev = path.join(dotEnvFiles, '.env.development');
const envProd = path.join(dotEnvFiles, '.env.production');

const packageJson = require(packageFile);

const entryPoints = ['inline', 'polyfills', 'sw-register', 'styles', 'scripts', 'vendor', 'main'];
const extSuffixes = ['.js', '.jsx', 'mjs', '.ts', '.tsx', 'mts', '.html', '.css', '.sass', '.scss', '.json'];

const excludePath = /node_modules/;

const serveHost = 'localhost';
const servePort = 4200;

const scssLoaders = (isModular) => [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      sourceMap: true,
      hmr: isDevMode,
    },
  },
  {
    loader: require.resolve('css-loader'),
    options: {
      sourceMap: true,
      modules: isModular,
      minimize: !isDevMode,
      localIdentName: isDevMode ? '[name]_[local]' : '[hash:base64]',
    },
  },
  {
    loader: require.resolve('postcss-loader'),
    options: {
      sourceMap: true,
      config: { path: configsRoot },
    },
  },
  {
    loader: require.resolve('resolve-url-loader'),
    options: { sourceMap: true },
  },
  {
    loader: require.resolve('sass-loader'),
    options: {
      sourceMap: true,
      implementation: sass,
      fiber: fibers,
    },
  },
];

const imageEnhancer = {
  loader: require.resolve('image-webpack-loader'),
  options: { disable: isDevMode },
};

const pwaIcons = isDevMode
  ? []
  : [
      {
        src: path.join(sourcesRoot, 'favicon.ico'),
        sizes: [16, 24, 32, 64],
        type: 'image/x-icon',
        destination: path.join('static', 'icons'),
      },
    ];

const environmentPlugins = isDevMode
  ? [
      new NamedModulesPlugin(),
      new HotModuleReplacementPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      new OpenBrowserPlugin({
        url: `http://${serveHost}:${servePort}`,
      }),
    ]
  : [
      new CleanWebpackPlugin(),
      new HashedModuleIdsPlugin({
        hashFunction: 'sha256',
        hashDigest: 'base64',
        hashDigestLength: 20,
      }),
      new GenerateSW({
        swDest: 'service-worker.js',
        precacheManifestFilename: 'static/js/precache-manifest.[manifestHash].js',
        clientsClaim: true,
      }),
    ];

module.exports = {
  bail: !isDevMode,
  mode: process.env.NODE_ENV,
  devtool: false,
  entry: {
    main: [path.join(sourcesRoot, 'main.tsx')],
    polyfills: [path.join(sourcesRoot, 'polyfills.ts')],
    styles: [path.join(sourcesRoot, 'styles.scss')],
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
    host: serveHost,
    port: servePort,
    inline: true,
    compress: true,
    historyApiFallback: true,
    watchContentBase: true,
    quiet: true,
    hot: true,
  },
  stats: {
    colors: true,
    errorDetails: true,
  },
  performance: {
    hints: false,
  },
  resolve: {
    extensions: extSuffixes,
    modules: [sourcesRoot, nodeModules],
    alias: {
      'react-dom': isDevMode ? '@hot-loader/react-dom' : 'react-dom',
    },
    mainFields: ['browser', 'module', 'main'],
    symlinks: true,
    plugins: [
      new TsconfigPathsPlugin({ configFile: typesConfig }),
      new DirectoryNamedWebpackPlugin(true),
      PnpWebpackPlugin,
    ],
  },
  resolveLoader: {
    modules: [nodeModules],
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: excludePath,
        enforce: 'pre',
        use: [{ loader: require.resolve('source-map-loader') }],
      },
      {
        test: /\.(ts|tsx|mts)$/,
        exclude: excludePath,
        use: [
          {
            loader: require.resolve('happypack/loader'),
            options: { id: 'typescript' },
          },
        ],
      },
      {
        test: /\.(sass|scss)$/,
        exclude: /\.module\.(css|sass|scss)$/,
        use: scssLoaders(false),
      },
      {
        test: /\.module\.(sass|scss)$/,
        exclude: excludePath,
        use: scssLoaders(true),
      },
      {
        test: /\.html$/,
        use: [
          { loader: require.resolve('html-loader') },
          {
            loader: require.resolve('posthtml-loader'),
            options: { config: { path: configsRoot } },
          },
        ],
      },
      {
        test: /\.(jpg|jpe|gif|png|ico|bmp|jpeg|webp)$/,
        use: [{ loader: require.resolve('url-loader') }, imageEnhancer],
      },
      {
        test: /\.svg$/,
        use: [{ loader: require.resolve('svg-url-loader') }, imageEnhancer],
      },
      {
        test: /\.(ani|cur|eot|otf|ttf|woff|woff2)$/,
        use: [{ loader: require.resolve('url-loader') }],
      },
    ],
  },
  optimization: {
    namedModules: true,
    namedChunks: true,
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    minimize: !isDevMode,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        extractComments: false,
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          parse: { bare_returns: true },
          compress: { warnings: false, comparisons: true },
          output: { comments: false, ascii_only: true },
        },
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.(sass|scss)$/,
        cssProcessor: cleanCss,
        cssProcessorPluginOptions: { sourceMap: true },
        canPrint: true,
      }),
      new PurifyCSSPlugin({
        paths: glob.sync([path.join(sourcesRoot, '**', '*')], { nodir: true }),
        minimize: true,
        styleExtensions: ['.sass', '.scss'],
        moduleExtensions: ['.html'],
      }),
      new HtmlMinifierPlugin({
        html5: true,
        caseSensitive: true,
        removeComments: true,
      }),
    ],
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new CaseSensitivePathsPlugin(),
    ...environmentPlugins,
    new Dotenv({
      path: isDevMode ? envDev : envProd,
      safe: true,
      silent: true,
      systemvars: true,
      defaults: false,
    }),
    new SourceMapDevToolPlugin({
      exclude: excludePath,
      test: /\.(js|jsx|mjs|ts|tsx|mts|css|sass|scss)$/,
      filename: isDevMode ? undefined : '[file].map[query]',
      moduleFilenameTemplate: '[resource-path]',
      fallbackModuleFilenameTemplate: '[resource-path]?[hash:8]',
      sourceRoot: 'webpack:///',
    }),
    new CircularDependencyPlugin({
      exclude: excludePath,
      failOnError: !isDevMode,
      onDetected: false,
      cwd: projectRoot,
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash:8].style.css',
      chunkFilename: 'static/css/chunks/[id].[hash:8].chunk.css',
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
        return leftIndex > rightIndex ? 1 : leftIndex < rightIndex ? -1 : 0;
      },
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer',
    }),
    new AssetsPlugin({
      path: destination,
      prettyPrint: true,
      includeManifest: true,
      keepInMemory: isDevMode,
      filename: 'static/json/webpack-assets.json',
    }),
    new ManifestPlugin({
      fileName: 'static/json/asset-manifest.json',
    }),
    new WebpackPwaManifest({
      filename: 'static/json/manifest.json',
      name: `${packageJson.name}-${packageJson.version}`,
      short_name: packageJson.name,
      description: packageJson.description,
      inject: true,
      fingerprints: true,
      crossorigin: 'use-credentials',
      start_url: './',
      display: 'standalone',
      theme_color: '#000000',
      background_color: '#ffffff',
      icons: pwaIcons,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true,
      tsconfig: typesConfig,
      tslint: !isDevMode,
      checkSyntacticErrors: true,
    }),
    new HappyPack({
      id: 'typescript',
      loaders: [
        {
          loader: require.resolve('babel-loader'),
          options: {
            configFile: babelConfig,
          },
        },
        {
          loader: require.resolve('ts-loader'),
          options: PnpWebpackPlugin.tsLoaderOptions({
            transpileOnly: true,
            happyPackMode: true,
            configFile: typesConfig,
          }),
        },
      ],
    }),
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
    dns: 'mock',
    fs: 'empty',
    module: 'empty',
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    child_process: 'empty',
  },
};
