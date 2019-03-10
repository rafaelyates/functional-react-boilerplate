import { FunctionComponent, memo } from 'react';
import { Route, Switch } from 'react-router-dom';

import { DummyComponent } from '@app/dummy/dummy.component';

interface IAppRoutingProperties { }

const AppRouting: FunctionComponent<IAppRoutingProperties> = memo((props: IAppRoutingProperties) => (
  <Switch>
    <Route path='/' component={DummyComponent} />
  </Switch>
));

export { AppRouting };
