import { FunctionComponent, lazy } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import { RouteData, Routing } from '@app/app.types';
import { DummyProps } from '@app/dummy/dummy.types';
import { LazyLoadedComponent } from '@app/shared/types/component.types';

const routes: ReadonlyArray<RouteData> = [
  {
    path: '/',
    render: (routing: Routing) => {
      const DummyComponent: LazyLoadedComponent<DummyProps> = lazy(async () => import('@app/dummy/dummy.component'));

      return <DummyComponent {...routing} />;
    },
  },
];

const AppRouting: FunctionComponent<Routing> = (props: Routing) => (
  <Switch>
    {routes.map((route: RouteData, index: number) => (
      <Route key={index} path={route.path} render={route.render} />
    ))}
  </Switch>
);

export default withRouter(AppRouting);
