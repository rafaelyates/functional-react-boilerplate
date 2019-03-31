import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';

import { AppComponent } from '@app/app.component';
import { browserHistory } from '@conf/routing.config';
import { store } from '@conf/store.config';

export default render(
  <Provider store={store}>
    <ConnectedRouter history={browserHistory}>
      <AppComponent />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
  () =>
    process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator
      ? window.addEventListener('load', async () => navigator.serviceWorker.register('./service-worker.js'))
      : undefined,
);
