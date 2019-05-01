import { Action, handleActions, ReduxCompatibleReducer } from 'redux-actions';

import { get } from 'lodash/fp';

import { DummyActionTypes } from '@app/dummy/dummy.constants';
import { DummyState } from '@app/dummy/dummy.models';
import { DummyPayload } from '@app/dummy/dummy.types';
import { ReducerFunction } from '@app/shared/types/function.types';

/**
 * The fallback state.
 */
const initialState: DummyState = {
  name: '',
};

/**
 * Function invoked when a {@link DummyActionTypes.NAME_SETUP} action has been dispatched.
 * @param state The current state.
 * @param action The action with the modification payload.
 */
const handleNameSetup: ReducerFunction<DummyState> = (
  state: DummyState = initialState,
  action: Action<DummyPayload>,
) => {
  const name: string | undefined = get('payload.data.items[0].name', action) as string;

  return { ...state, name };
};

/**
 * Maps all the actions to it's corresponding reducer functions, always delivering a state.
 */
const actionsRecord: Record<DummyActionTypes, ReducerFunction<DummyState>> = {
  [DummyActionTypes.DUMMY_NAME_SETUP_ACTION]: handleNameSetup,
};

const dummyReducer: ReduxCompatibleReducer<DummyState, DummyPayload> = handleActions(actionsRecord, initialState);

export { dummyReducer };
