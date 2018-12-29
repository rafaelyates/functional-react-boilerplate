import { ConnectedRouter } from 'connected-react-router';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AnyAction, applyMiddleware, createStore, Store } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import { AppComponent } from '@app/app.component';
import { reducers } from '@conf/reducers.config';
import { browserHistory, history } from '@conf/routing.config';

declare const window: Window & {
  readonly __REDUX_DEVTOOLS_EXTENSION__?: () => AnyAction;
};

const devTools: AnyAction | undefined = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined)
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : undefined;

const store: Store = applyMiddleware(thunk, promise, history)(createStore)(reducers, devTools);

export default ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <AppComponent />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
