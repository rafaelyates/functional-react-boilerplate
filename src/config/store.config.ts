import { applyMiddleware, compose, createStore, Reducer, Store, StoreEnhancer } from 'redux';
import { PersistConfig, Persistor, persistReducer, persistStore } from 'redux-persist';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import localForage from 'localforage';

import { logger } from '@conf/logging.config';
import { reducers } from '@conf/reducers.config';
import { history } from '@conf/routing.config';

/**
 * See https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
 * For a list of options to be passed here.
 */
const devToolsOptions: Object = {};

/**
 * The configurations used by redux to persist the store.
 */
const persistConfig: PersistConfig = {
  key: 'root',
  storage: localForage,
};

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
 * Creates the store enhancers as follows:
 * - The redux middleware list to be used.
 * - Composes the enhancers.
 * - The reducers persisted.
 */
const middleware: StoreEnhancer = applyMiddleware(thunk, promise, history, logger);
const enhancer: StoreEnhancer = composeEnhancers(middleware);
const persistedReducers: Reducer = persistReducer(persistConfig, reducers);

/**
 * Creates the store and it's persistor.
 */
const store: Store = createStore(persistedReducers, enhancer);
const persistor: Persistor = persistStore(store);

export { store, persistor };
