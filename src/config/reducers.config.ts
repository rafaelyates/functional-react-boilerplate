import { combineReducers, Reducer } from 'redux';

import { IDummyPayload } from '@app/dummy/dummy.payload';
import { dummyReducer } from '@app/dummy/dummy.reducer';

interface IAppState {
  readonly dummy: Reducer<IDummyPayload>;
}

const reducers: Reducer = combineReducers<IAppState>({
  dummy: dummyReducer
});

export { IAppState, reducers };
