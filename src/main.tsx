import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import AppComponent from '@app/app.component';
import { serviceWorkerHook } from '@conf/service-worker.config';
import { persistor, store } from '@conf/store.config';

/**
 * Renders the react application with redux storage.
 * Calls the service worker after the rendering completes.
 */
export default render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AppComponent />
    </PersistGate>
  </Provider>,
  document.getElementById('app'),
  serviceWorkerHook,
);
