import { Fragment, FunctionComponent, lazy, memo, ReactNode } from 'react';

import { LazyLoadedComponent } from '@app/app.models';
import { DummyProps } from '@app/dummy/dummy.models';

const Component: LazyLoadedComponent<DummyProps> = lazy(async () => import('@app/dummy/dummy.component'));

const DummyLazyComponent: FunctionComponent<unknown> = memo(() => (
  <Fragment>
    <Component />
  </Fragment>
));

const DummyLoader: () => ReactNode = () => <DummyLazyComponent />;

export { DummyLoader };
