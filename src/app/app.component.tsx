import { FunctionComponent, memo, Suspense } from 'react';

import { AppRouting } from '@app/app.routing';

const AppComponent: FunctionComponent<unknown> = () => (
  <div className="container is-fluid">
    <Suspense fallback={<progress className="progress is-small is-primary" max="100" />}>
      <AppRouting />
    </Suspense>
  </div>
);

export { AppComponent };
