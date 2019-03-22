import { ChangeEvent } from 'react';

import { ActionCreator } from 'redux';
import { Action } from 'redux-actions';

import { set } from 'lodash/fp';

import { dummyActions, DummyActionTypes } from '@app/dummy/dummy.actions';
import { DummyPayload } from '@app/dummy/dummy.models';

describe('Dummy Actions', () => {
  it('should correctly build a nameSetup action', () => {
    const name: string = 'action name';

    const payload: DummyPayload = set('data.items[0].name', name, { id: 'MOCKED_DATA' });
    const expectedAction: Action<DummyPayload> = { payload, type: DummyActionTypes.DUMMY_NAME_SETUP_ACTION };

    const event: ChangeEvent<HTMLInputElement> = set('target.value', name, {}) as ChangeEvent<HTMLInputElement>;
    const nameActionDispatcher: ActionCreator<void> = dummyActions.setupName(event);

    return nameActionDispatcher((createdAction: Action<DummyPayload>) => expect(createdAction).toEqual(expectedAction));
  });
});
