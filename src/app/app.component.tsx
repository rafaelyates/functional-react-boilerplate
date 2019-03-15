import { FunctionComponent, memo } from 'react';

import { AppComponentProps } from '@app/app.models';
import { AppRouting } from '@app/app.routing';

const AppComponent: FunctionComponent<AppComponentProps> = memo((props: AppComponentProps) => (
  <div className='container'>
    <AppRouting />
  </div>
));

export { AppComponent };
