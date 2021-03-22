import { shallowMount } from '@vue/test-utils';

import store from '@/store/index';

export default function createWrapper(testComponent, { state = {}, propsData = {} } = {}) {
  Object.assign(store.state, state);

  const wrapper = shallowMount(testComponent, {
    propsData,
    store,
  });

  return wrapper;
}
