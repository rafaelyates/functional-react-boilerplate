import { FunctionComponent, Suspense } from 'react';
import { hot } from 'react-hot-loader/root';

import { AppRouting } from '@app/app.routing';

/**
 * This is the root component of the project.
 */
const AppComponent: FunctionComponent<unknown> = hot(() => (
  <div className="container is-fluid">
    <Suspense fallback={<progress className="progress is-small is-primary" max="100" />}>
      <AppRouting />
    </Suspense>
  </div>
));

export { AppComponent };
