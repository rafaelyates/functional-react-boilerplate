import { ChangeEvent, Dispatch } from 'react';

import { Action, createAction } from 'redux-actions';

import { DummyPayload, IDummyActions } from '@app/dummy/dummy.models';
import { ActionFunction } from '@app/shared/models/function.models';

/**
 * Enumerates the possible dispatch actions.
 */
enum DummyActionTypes {
  NAME_SETUP = 'NAME_SETUP',
}

/**
 * Function invoked to a {@link DummyActionTypes.NAME_SETUP} action.
 * @param event The change event of a input text html element.
 */
const setupName: ActionFunction<ChangeEvent<HTMLInputElement>> = (event: ChangeEvent<HTMLInputElement>) => {

  const receivedName: string = event.target.value;

  const payloadBuilder: (name: string) => DummyPayload = (name: string) => ({
    id: 'MOCKED_DATA',
    data: { items: [{ name }] },
  });

  const nameAction: Action<DummyPayload> = createAction(
    DummyActionTypes.NAME_SETUP,
    payloadBuilder,
  )(receivedName);

  return (dispatch: Dispatch<Action<DummyPayload>>) => dispatch(nameAction);
};

/**
 * Object used to store all the dispatch actions.
 */
const dummyActions: IDummyActions = { setupName };

export { DummyActionTypes, dummyActions };
