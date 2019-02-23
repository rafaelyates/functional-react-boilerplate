import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { applyMiddleware, createStore, DeepPartial, Store } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import { ConnectedRouter } from 'connected-react-router';

import { AppComponent } from '@app/app.component';
import { IAppState, reducers } from '@conf/reducers.config';
import { browserHistory, history } from '@conf/routing.config';

declare const window: Window & {
  readonly __REDUX_DEVTOOLS_EXTENSION__?: () => DeepPartial<IAppState>;
};

const devTools: DeepPartial<IAppState> | undefined = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__ !== undefined)
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
