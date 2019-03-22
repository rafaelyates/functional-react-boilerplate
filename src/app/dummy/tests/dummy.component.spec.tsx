import { createMockStore } from 'redux-test-utils';

import { ShallowWrapper } from 'enzyme';
import { shallowWithStore } from 'enzyme-redux';

import { AppState } from '@app/app.models';
import { dummyActions } from '@app/dummy/dummy.actions';
import DummyComponent from '@app/dummy/dummy.component';
import { DummyState } from '@app/dummy/dummy.models';

describe('Dummy Component', () => {
  const initialState: Partial<AppState> = {
    dummy: { name: 'component name' },
  };

  it('should render without crashing', () => {
    const wrapper: ShallowWrapper<DummyState> = shallowWithStore(
      <DummyComponent setupName={dummyActions.setupName} />,
      createMockStore(initialState),
    );

    expect(wrapper).toBeDefined();
    expect(wrapper.props().name).toBe('component name');
  });
});
