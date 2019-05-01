import { ChangeEvent, Dispatch } from 'react';

import { compose } from 'redux';
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
  return (dispatch: Dispatch<Action<DummyPayload>>) => {
    return compose(
      dispatch,
      createAction(DummyActionTypes.DUMMY_NAME_SETUP_ACTION, (name: string) =>
        set('data.items[0].name', name.toLowerCase(), { id: 'MOCKED_DATA' }),
      ),
    )(event.target.value);
  };
};

/**
 * Object used to store all the dispatch actions.
 */
const dummyActions: Required<DummyActions> = { setupName };

export { dummyActions };
