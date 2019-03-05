import { Reducer } from 'redux';
import { Action, handleActions } from 'redux-actions';

import { DummyActionTypes } from '@app/dummy/dummy.actions';
import { DummyPayload, IDummyState } from '@app/dummy/dummy.models';
import { ReducerFunction } from '@app/shared/models/function.models';

/**
 * The fallback state.
 */
const initialState: IDummyState = {
  name: '',
};

/**
 * Function invoked when a {@link DummyActionTypes.NAME_SETUP} action has been dispatched.
 * @param state The current state.
 * @param action The action with the modification payload.
 */
const handleNameSetup: ReducerFunction<IDummyState> = (state: IDummyState, action: Action<DummyPayload>) => {

  const name: string | undefined = action.payload && action.payload.data
    ? action.payload.data.items[0].name
    : undefined;

  return { ...state, name };
};

/**
 * Maps all the actions to it's corresponding reducer functions, always delivering a state.
 */
const actionsRecord: Record<DummyActionTypes, ReducerFunction<IDummyState>> = {
  [DummyActionTypes.NAME_SETUP]: handleNameSetup,
};

const dummyReducer: Reducer = handleActions(actionsRecord, initialState);

export { dummyReducer };
