import { ComponentType } from 'react';

import { FormStateMap } from 'redux-form';

import { RouterState } from 'connected-react-router';

import { DummyState } from '@app/dummy/dummy.models';

export declare type LazyLoadedComponent = ComponentType<unknown>;

export interface AppState {
  readonly dummy: DummyState;
  readonly router: RouterState;
  readonly form: FormStateMap;
}