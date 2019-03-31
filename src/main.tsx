import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';

import { AppComponent } from '@app/app.component';
import { browserHistory } from '@conf/routing.config';
import { serviceWorkerHook } from '@conf/service-worker.config';
import { store } from '@conf/store.config';

/**
 * Renders the react application with redux storage.
 * Calls the service worker after the rendering completes.
 */
export default render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <AppComponent />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
  serviceWorkerHook,
);
