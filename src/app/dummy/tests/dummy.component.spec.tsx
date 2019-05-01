import { Provider } from 'react-redux';

import { createMockStore, mockStore } from 'redux-test-utils';

import { mount, ReactWrapper } from 'enzyme';

import { AppState } from '@app/app.models';
import DummyComponent from '@app/dummy/dummy.component';
import { DummyState } from '@app/dummy/dummy.models';

describe('Component: DummyComponent', () => {
  const store: mockStore<AppState> = createMockStore({
    dummy: { name: '' },
  });

  const wrapper: ReactWrapper<DummyState> = mount(
    <Provider store={store}>
      <DummyComponent />
    </Provider>,
  );

  const dummyWrapper: ReactWrapper<DummyState> = wrapper.find('DummyComponent');

  it('should render without crashing', () => {
    expect(dummyWrapper).toBeDefined();
    expect(dummyWrapper.props().name).toBe('');
  });
});
