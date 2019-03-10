import { FunctionComponent, memo } from 'react';

import { AppRouting } from '@app/app.routing';

interface IAppComponentProperties { }

const AppComponent: FunctionComponent<IAppComponentProperties> = memo((props: IAppComponentProperties) => (
  <div className='container'>
    <AppRouting />
  </div>
));

export { AppComponent };
