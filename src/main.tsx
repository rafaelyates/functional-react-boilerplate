import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { applyMiddleware, createStore, DeepPartial, Store } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import { ConnectedRouter } from 'connected-react-router';

import { AppComponent } from '@app/app.component';
import { AppState } from '@app/app.models';
import { logger } from '@conf/logging.config';
import { reducers } from '@conf/reducers.config';
import { browserHistory, history } from '@conf/routing.config';

declare const window: Window & {
  readonly __REDUX_DEVTOOLS_EXTENSION__?: () => DeepPartial<AppState>;
};

const devTools: DeepPartial<AppState> = process.env.NODE_ENV === 'development' && !!window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : {};

const store: Store = applyMiddleware(thunk, promise, history, logger)(createStore)(reducers, devTools);

export default render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <AppComponent />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
  () => process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator
    ? window.addEventListener('load', async () => navigator.serviceWorker.register('./service-worker.js'))
    : undefined,
);
