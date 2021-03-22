import getFieldHeight from '@/helpers/get_field_height';

describe('helpers: get_field_height.js', () => {
  it.each([
    [2, 174, 522],
    [2, 100, 300],
    [2, 128, 384],
  ])('return correct height for gameLevel = %i, cellHeight = %i', (gameLevel, cellHeight, expectedFieldHeight) => {
    const height = getFieldHeight(gameLevel, cellHeight);

    expect(height).toBe(expectedFieldHeight);
  });
});
