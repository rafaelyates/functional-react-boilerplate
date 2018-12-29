import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { DummyComponent } from '@app/dummy/dummy.component';

interface IAppRoutingProperties { }

const AppRouting: React.FunctionComponent<IAppRoutingProperties> = React.memo((props: IAppRoutingProperties) => (
  <Switch>
    <Route path='/dummy' component={DummyComponent} />
    <Redirect from='/*' to='/dummy' />
  </Switch>
));

export { AppRouting };
