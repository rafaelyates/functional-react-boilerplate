import { FunctionComponent, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { LazyLoadedComponent } from '@app/app.models';
import { DummyProps } from '@app/dummy/dummy.models';

const lazyDummy: LazyLoadedComponent<DummyProps> = lazy(async () => import('@app/dummy/dummy.component'));

const AppRouting: FunctionComponent<unknown> = () => (
  <Switch>
    <Redirect exact={true} from='/' to='/dummy' />
    <Route path='/dummy' component={lazyDummy} />
  </Switch>
);

export { AppRouting };
