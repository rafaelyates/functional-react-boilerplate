import { ChangeEvent, Dispatch } from 'react';
import { ActionCreator } from 'redux';
import { Action, createAction } from 'redux-actions';

import { IDummyPayload } from '@app/dummy/dummy.payload';

declare type ActionFunction<T> = (parameter: T) => ActionCreator<void>;

enum DummyActions {
  NAME_SETUP = 'NAME_SETUP'
}

const setupName: ActionFunction<ChangeEvent<HTMLInputElement>> = (event: ChangeEvent<HTMLInputElement>) => {

  const nameAction: Action<IDummyPayload> = createAction(DummyActions.NAME_SETUP, (name: string) => ({
    name
  }))(event.target.value);

  return (dispatch: Dispatch<Action<IDummyPayload>>) => dispatch(nameAction);
};

export { DummyActions, setupName };
