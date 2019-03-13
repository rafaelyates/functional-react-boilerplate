import { ChangeEvent } from 'react';

import { ActionCreator } from 'redux';
import { Action } from 'redux-actions';
import { createMockStore } from 'redux-test-utils';

import { ShallowWrapper } from 'enzyme';
import { shallowWithStore } from 'enzyme-redux';
import { set } from 'lodash/fp';

import { dummyActions, DummyActionTypes } from '@app/dummy/dummy.actions';
import { DummyComponent } from '@app/dummy/dummy.component';
import { DummyPayload, IDummyState } from '@app/dummy/dummy.models';
import { dummyReducer } from '@app/dummy/dummy.reducer';
import { IAppState } from '@conf/reducers.config';

describe('Dummy Module', () => {

  describe('Dummy Component', () => {
    const initialState: Partial<IAppState> = {
      dummy: { name: 'component name' },
    };

    it('should render without crashing', () => {
      const wrapper: ShallowWrapper<IDummyState> = shallowWithStore(
        <DummyComponent />,
        createMockStore(initialState),
      );

      expect(wrapper).toBeDefined();
      expect(wrapper.props().name).toBe('component name');
    });
  });

  describe('Dummy Actions', () => {

    it('should correctly build a nameSetup action', () => {
      const name: string = 'action name';

      const payload: DummyPayload = set('data.items[0].name', name, { id: 'MOCKED_DATA' });
      const expectedAction: Action<DummyPayload> = { type: DummyActionTypes.NAME_SETUP, payload };

      const event: ChangeEvent<HTMLInputElement> = set('target.value', name, {}) as ChangeEvent<HTMLInputElement>;
      const nameActionDispatcher: ActionCreator<void> = dummyActions.setupName(event);

      return nameActionDispatcher((createdAction: Action<DummyPayload>) => expect(createdAction).toEqual(expectedAction));
    });
  });

  describe('Dummy Reducer', () => {
    const defaultState: IDummyState = { name: '' };

    it('should output the default state when no action is provided', () => {
      const defaultAnswer: IDummyState = dummyReducer(undefined, { type: '' }) as IDummyState;
      expect(defaultAnswer).toEqual(defaultState);
    });

    it('should correctly reduce the name', () => {
      const name: string = 'reduce name';
      const payload: DummyPayload = set('data.items[0].name', name, { id: 'TEST_DATA' });
      const action: Action<DummyPayload> = { type: DummyActionTypes.NAME_SETUP, payload };

      const reducedAnswer: IDummyState = dummyReducer(defaultState, action) as IDummyState;
      expect(reducedAnswer.name).toBe(name);
    });
  });

});
