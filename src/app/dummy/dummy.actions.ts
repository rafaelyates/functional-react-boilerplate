import { ChangeEvent, Dispatch } from 'react';

import { Action, createAction } from 'redux-actions';

import { set } from 'lodash/fp';

import { DummyActions, DummyPayload } from '@app/dummy/dummy.models';
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

  const nameAction: Action<DummyPayload> = createAction(
    DummyActionTypes.NAME_SETUP,
    (name: string) => set('data.items[0].name', name, { id: 'MOCKED_DATA' }),
  )(event.target.value);

  return (dispatch: Dispatch<Action<DummyPayload>>) => dispatch(nameAction);
};

/**
 * Object used to store all the dispatch actions.
 */
const dummyActions: DummyActions = { setupName };

export { DummyActionTypes, dummyActions };
