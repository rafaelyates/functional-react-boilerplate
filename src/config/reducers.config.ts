import { combineReducers, Reducer } from 'redux';
import { FormStateMap, reducer as formReducer } from 'redux-form';

import { RouterState } from 'connected-react-router';

import { IDummyState } from '@app/dummy/dummy.models';
import { dummyReducer } from '@app/dummy/dummy.reducer';
import { routerReducer } from '@conf/routing.config';

export interface IAppState {
  readonly dummy: IDummyState;
  readonly router: RouterState;
  readonly form: FormStateMap;
}

const reducers: Reducer<IAppState> = combineReducers({
  dummy: dummyReducer,
  router: routerReducer,
  form: formReducer,
});

export { reducers };
