import { FunctionComponent, memo } from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppRoutingProps } from '@app/app.models';
import { DummyComponent } from '@app/dummy/dummy.component';

const AppRouting: FunctionComponent<AppRoutingProps> = memo((props: AppRoutingProps) => (
  <Switch>
    <Route path='/' component={DummyComponent} />
  </Switch>
));

export { AppRouting };
