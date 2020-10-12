import React from 'react';
import { shallow } from 'enzyme';
import ToggleChatButton from './ToggleChatButton';
import { ChatProvider } from '../../ChatProvider/ChatProvider';

describe('the ToggleChatButton component', () => {

  it('should toggle when clicked', () => {
    const wrapper = shallow(<ChatProvider>
      <ToggleChatButton />
    </ChatProvider>);
    wrapper.simulate('click');
    expect(wrapper.find('Close')).toBeDefined();
  });

});
