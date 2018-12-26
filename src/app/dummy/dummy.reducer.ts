import { Reducer } from 'redux';
import { Action, handleActions } from 'redux-actions';

import { DummyActions } from '@app/dummy/dummy.actions';
import { IDummyPayload } from '@app/dummy/dummy.payload';

const initialState: IDummyPayload = {
  name: ''
};

const actionsRecord: Record<DummyActions, (state: IDummyPayload, action: Action<IDummyPayload>) => IDummyPayload> = {
  [DummyActions.NAME_SETUP]: (state: IDummyPayload, action: Action<IDummyPayload>) => {
    const name: string | undefined = action.payload ? action.payload.name : undefined;

    return { ...state, name };
  }
};

const dummyReducer: Reducer = handleActions(actionsRecord, initialState);

export { dummyReducer };
