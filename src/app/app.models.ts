import { ReactNode } from 'react';

import { FormStateMap } from 'redux-form';

import { RouterState } from 'connected-react-router';

import { Routing } from '@app/app.types';
import { DummyState } from '@app/dummy/dummy.models';

export interface AppState {
  readonly dummy: DummyState;
  readonly router: RouterState;
  readonly form: FormStateMap;
}

export interface RouteInfo {
  readonly path: string;
}

export interface RouteActor {
  readonly render: (routing: Routing) => ReactNode;
}
