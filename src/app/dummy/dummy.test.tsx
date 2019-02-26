import configureStore, { MockStoreCreator, MockStoreEnhanced } from 'redux-mock-store';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import { ShallowWrapper } from 'enzyme';
import { shallowWithStore } from 'enzyme-redux';

import { DummyComponent } from '@app/dummy/dummy.component';

describe('Component: Dummy', () => {
  const mockStoreCreator: MockStoreCreator = configureStore([thunk, promise]);
  const store: MockStoreEnhanced = mockStoreCreator({});

  it('should render without crashing', () => {
    const wrapper: ShallowWrapper = shallowWithStore(<DummyComponent />, store);
    expect(wrapper).toBeDefined();
  });

});
