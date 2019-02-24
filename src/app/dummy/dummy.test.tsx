import { shallow, ShallowWrapper } from 'enzyme';

import { DummyComponent } from '@app/dummy/dummy.component';

describe('Component: Dummy', () => {

  it('should render without crashing', () => {
    const wrapper: ShallowWrapper = shallow(<DummyComponent />);
    expect(wrapper).toBeDefined();
  });

});
