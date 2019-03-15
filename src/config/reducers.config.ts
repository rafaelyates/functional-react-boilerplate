import { combineReducers, Reducer } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { AppState } from '@app/app.models';
import { dummyReducer } from '@app/dummy/dummy.reducer';
import { routerReducer } from '@conf/routing.config';

const reducers: Reducer<AppState> = combineReducers({
  dummy: dummyReducer,
  router: routerReducer,
  form: formReducer,
});

export { reducers };
