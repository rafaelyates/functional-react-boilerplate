import { combineReducers, Reducer } from 'redux';

import { RouterState } from 'connected-react-router';

import { IDummyState } from '@app/dummy/dummy.models';
import { dummyReducer } from '@app/dummy/dummy.reducer';
import { routerReducer } from '@conf/routing.config';

export interface IAppState {
  readonly dummy: IDummyState;
  readonly router: RouterState;
}

const reducers: Reducer<IAppState> = combineReducers({
  dummy: dummyReducer,
  router: routerReducer
});

export { reducers };
