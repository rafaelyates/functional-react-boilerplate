import { ChangeEvent, Dispatch } from 'react';

import { Action, createAction } from 'redux-actions';

import { set } from 'lodash/fp';

import { DummyActionTypes } from '@app/dummy/dummy.constants';
import { DummyActions } from '@app/dummy/dummy.models';
import { DummyPayload } from '@app/dummy/dummy.types';
import { ActionFunction } from '@app/shared/types/function.types';

/**
 * Function invoked to a {@link DummyActionTypes.NAME_SETUP} action.
 * @param event The change event of a input text html element.
 */
const setupName: ActionFunction<ChangeEvent<HTMLInputElement>> = (event: ChangeEvent<HTMLInputElement>) => {
  const namePayloadAction: Action<DummyPayload> = createAction(
    DummyActionTypes.DUMMY_NAME_SETUP_ACTION,
    (name: string) => set('data.items[0].name', name, { id: 'MOCKED_DATA' }),
  )(event.target.value);

  return (dispatch: Dispatch<Action<DummyPayload>>) => dispatch(namePayloadAction);
};

/**
 * Object used to store all the dispatch actions.
 */
const dummyActions: Required<DummyActions> = { setupName };

export { dummyActions };
