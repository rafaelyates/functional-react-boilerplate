import { FunctionComponent, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { LazyLoadedComponent } from '@app/app.models';

const lazyDummy: LazyLoadedComponent = lazy(async () => import('@app/dummy'));

const AppRouting: FunctionComponent<unknown> = () => (
  <Switch>
    <Redirect exact={true} from='/' to='/dummy' />
    <Route path='/dummy' component={lazyDummy} />
  </Switch>
);

export { AppRouting };
