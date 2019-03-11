'use strict';

const precss = require('precss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const pleeeaseFilters = require('pleeease-filters');
const pixrem = require('pixrem');
const cssMqpacker = require('css-mqpacker');
const rucksackCss = require('rucksack-css');
const csswring = require('csswring');
const lost = require('lost');

const postcssScss = require('postcss-scss');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');
const postcssPresetEnv = require('postcss-preset-env');
const postcssFlexBugsFixes = require('postcss-flexbugs-fixes');
const postcssAssets = require('postcss-assets');
const postcssCustomProperties = require('postcss-custom-properties');
const postcssCustomMedia = require('postcss-custom-media');
const postcssMediaMinmax = require('postcss-media-minmax');
const postcssCustomSelectors = require('postcss-custom-selectors');
const postcssSelectorNot = require('postcss-selector-not');
const postcssSelectorMatches = require('postcss-selector-matches');
const postcssCalc = require('postcss-calc');
const postcssFontVariant = require('postcss-font-variant');
const postcssNesting = require('postcss-nesting');
const postcssNested = require('postcss-nested');
const postcssColorFunction = require('postcss-color-function');
const postcssOpacity = require('postcss-opacity');
const postcssPseudoElements = require('postcss-pseudoelements');
const postcssVmin = require('postcss-vmin');

const projectRoot = __dirname || process.cwd();

module.exports = {
  ident: 'postcss',
  parser: postcssScss,
  plugins: [
    postcssImport({ root: projectRoot }),
    postcssUrl({ useHash: true, hashOptions: 'xxhash64' }),
    postcssAssets(),
    postcssCustomProperties(),
    postcssCustomMedia(),
    postcssMediaMinmax(),
    postcssCustomSelectors(),
    postcssSelectorNot(),
    postcssSelectorMatches(),
    postcssCalc(),
    postcssFontVariant(),
    postcssNesting(),
    postcssNested(),
    postcssColorFunction(),
    postcssOpacity(),
    postcssPseudoElements(),
    postcssVmin(),
    postcssPresetEnv({ browsers: 'last 2 versions', stage: 0 }),
    postcssFlexBugsFixes(),
    pleeeaseFilters(),
    pixrem(),
    lost(),
    autoprefixer({ grid: true, flexbox: true }),
    rucksackCss(),
    csswring(),
    cssMqpacker(),
    precss(),
    cssnano({ preset: 'default', discardUnused: true }),
  ],
}
