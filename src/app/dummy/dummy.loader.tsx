import { Fragment, FunctionComponent, lazy, memo, ReactNode } from 'react';

import { DummyProps } from '@app/dummy/dummy.types';
import { LazyLoadedComponent } from '@app/shared/types/component.types';

const Component: LazyLoadedComponent<DummyProps> = lazy(async () => import('@app/dummy/dummy.component'));

const DummyLazyComponent: FunctionComponent<unknown> = memo(() => (
  <Fragment>
    <Component />
  </Fragment>
));

const DummyLoader: () => ReactNode = () => <DummyLazyComponent />;

export { DummyLoader };
