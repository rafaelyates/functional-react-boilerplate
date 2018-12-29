import { RouterState } from 'connected-react-router';
import { combineReducers, Reducer } from 'redux';

import { IDummyPayload } from '@app/dummy/dummy.payload';
import { dummyReducer } from '@app/dummy/dummy.reducer';
import { routerReducer } from '@conf/routing.config';

interface IAppState {
  readonly dummy: IDummyPayload;
  readonly router: RouterState;
}

const reducers: Reducer<IAppState> = combineReducers({
  dummy: dummyReducer,
  router: routerReducer
});

export { IAppState, reducers };
