import React from 'react';
import { shallow } from 'enzyme';
import { Picture } from './Picture';

it('renders correctly', () => {
  const wrapper = shallow(<Picture />);
  expect(wrapper).toMatchSnapshot();
});
