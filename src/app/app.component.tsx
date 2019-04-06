import { FunctionComponent, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';

import { ConnectedRouter } from 'connected-react-router';

import { AppRouting } from '@app/app.routing';
import { browserHistory } from '@conf/routing.config';

/**
 * This is the root component of the project.
 */
const AppComponent: FunctionComponent<unknown> = hot(() => (
  <ConnectedRouter history={browserHistory}>
    <div className="container is-fluid">
      <Suspense fallback={<progress className="progress is-small is-primary" max="100" />}>
        <AppRouting />
      </Suspense>
    </div>
  </ConnectedRouter>
));

export { AppComponent };
