import { Action } from 'redux-actions';

import { set } from 'lodash/fp';

import { DummyActionTypes } from '@app/dummy/dummy.constants';
import { DummyState } from '@app/dummy/dummy.models';
import { dummyReducer } from '@app/dummy/dummy.reducer';
import { DummyPayload } from '@app/dummy/dummy.types';

describe('Reducer: DummyReducer', () => {
  const defaultState: DummyState = { name: '' };

  it('should output the default state when no action is provided', () => {
    const defaultAnswer: DummyState = dummyReducer(undefined, { type: '', payload: { id: '' } });
    expect(defaultAnswer).toEqual(defaultState);
  });

  it('should correctly reduce the name', () => {
    const name: string = 'reduce name';
    const payload: DummyPayload = set('data.items[0].name', name, { id: 'TEST_DATA' });
    const action: Action<DummyPayload> = { payload, type: DummyActionTypes.DUMMY_NAME_SETUP_ACTION };

    const reducedAnswer: DummyState = dummyReducer(defaultState, action);
    expect(reducedAnswer.name).toBe(name);
  });
});
