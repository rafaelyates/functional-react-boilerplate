import { FunctionComponent } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { DummyLoader } from '@app/dummy/dummy.loader';

const AppRouting: FunctionComponent<unknown> = () => (
  <Switch>
    <Redirect exact={true} from="/" to="/dummy" />
    <Route path="/dummy" render={DummyLoader} />
  </Switch>
);

export { AppRouting };
