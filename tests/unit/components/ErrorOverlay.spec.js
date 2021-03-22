import ErrorOverlay from '@/components/ErrorOverlay.vue';

import createWrapper from '../../helpers/createWrapper';

describe('components: ErrorOverlay.vue', () => {
  let wrapper = null;

  afterEach(() => {
    wrapper = null;
  });

  it('renders correct message with default state', () => {
    const EXPECTED_TEXT = 'Connection error. Retry';

    wrapper = createWrapper(ErrorOverlay);
    expect(wrapper.text()).toMatch(EXPECTED_TEXT);
  });

  it('renders correct message while processing', () => {
    const EXPECTED_TEXT = 'Connection error. Retrying...';

    wrapper = createWrapper(ErrorOverlay, { state: { processing: true } });
    expect(wrapper.text()).toMatch(EXPECTED_TEXT);
  });
});
