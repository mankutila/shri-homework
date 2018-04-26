import React from 'react';
import { shallow } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Infinite } from './Infinite';

const shallowWithStore = (component, store) => {
  const context = {
    store,
  };
  return shallow(component, { context });
};

it('renders correctly', () => {

  const testState = {
    images: {
      images: [],
      page: 1,
      allLoaded: false
    },
    lightbox: {
      isOpen: false
    },
    tags: {
      current: 'architecture'
    }

  };
  const store = createMockStore(testState);

  const wrapper = shallowWithStore(<Infinite />, store)

  expect(wrapper).toMatchSnapshot();
});
