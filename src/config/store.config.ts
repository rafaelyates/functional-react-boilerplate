import { applyMiddleware, compose, createStore, Store, StoreEnhancer } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import { logger } from '@conf/logging.config';
import { reducers } from '@conf/reducers.config';
import { history } from '@conf/routing.config';

/**
 * See https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
 * For a list of options to be passed here.
 */
const devToolsOptions: Object = {};

/**
 * Merges default javascript window with custom properties,
 * adding optional redux devTools extension composer to it.
 */
declare const window: Window & {
  readonly __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: (options: unknown) => <R>(a: R) => R;
};

/**
 * Chooses the compose to be used, if the environment is development and the
 * browser has support for redux devTools, composes with the extension using
 * the preset options, otherwise it uses the default redux compose function.
 */
const composeEnhancers: <R>(a: R) => R =
  process.env.NODE_ENV === 'development' && !!window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(devToolsOptions)
    : compose;

/**
 * Creates the store as follows:
 *
 * - The redux middleware list to be used.
 * - Composes the enhancers.
 * - Build it based on the reducers and enhancers.
 */
const middleware: StoreEnhancer = applyMiddleware(thunk, promise, history, logger);
const enhancer: StoreEnhancer = composeEnhancers(middleware);
const store: Store = createStore(reducers, enhancer);

export { store };
