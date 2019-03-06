import { createMockStore } from 'redux-test-utils';

import { ShallowWrapper } from 'enzyme';
import { shallowWithStore } from 'enzyme-redux';

import { DummyComponent } from '@app/dummy/dummy.component';
import { IDummyState } from '@app/dummy/dummy.models';
import { IAppState } from '@conf/reducers.config';

describe('Component: Dummy', () => {

  const initialState: Partial<IAppState> = {
    dummy: { name: 'kek' },
  };

  it('should render without crashing', () => {
    const wrapper: ShallowWrapper<IDummyState> = shallowWithStore(
      <DummyComponent />,
      createMockStore(initialState),
    );

    expect(wrapper).toBeDefined();
    expect(wrapper.props().name).toBe('kek');
  });

});
