import React from 'react';
import { shallow, mount, render } from 'enzyme';

import App from './App';
import Header from './component/header/header';
import Foot from './component/foot/foot';

describe('Testing Component <App>', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(Header).length).toBe(1);
    expect(wrapper.find(Foot).length).toBe(1);
  });

});
