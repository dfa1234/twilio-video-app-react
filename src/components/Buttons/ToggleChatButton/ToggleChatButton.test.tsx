import React from 'react';
import { shallow } from 'enzyme';
import ToggleChatButton from './ToggleChatButton';

describe('the ToggleChatButton component', () => {

  it('should toggle when clicked', () => {
    const wrapper = shallow(<ToggleChatButton />);
    wrapper.simulate('click');
    expect(wrapper.find('Close')).toBeDefined();
  });

});
