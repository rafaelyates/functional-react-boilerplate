import React from 'react';

import { AppRouting } from '@app/app.routing';

interface IAppComponentProperties { }

const AppComponent: React.FunctionComponent<IAppComponentProperties> = React.memo((props: IAppComponentProperties) => (
  <div className='container-fluid'>
    <AppRouting />
  </div>
));

export { AppComponent };
