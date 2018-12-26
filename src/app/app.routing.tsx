import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { DummyComponent } from '@app/dummy/dummy.component';

interface IAppRoutingProperties { }

const AppRouting: React.FunctionComponent<IAppRoutingProperties> = React.memo((props: IAppRoutingProperties) => (
  <BrowserRouter>
    <Switch>
      <Route path='/dummy' component={DummyComponent} />
      <Redirect from='/*' to='/dummy' />
    </Switch>
  </BrowserRouter>
));

export { AppRouting };
