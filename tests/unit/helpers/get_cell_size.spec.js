import getCellSize from '@/helpers/get_cell_size';

describe('helpers: get_cell_size.js', () => {
  it.each([
    [2, 200, 174],
    [3, 125, 108],
    [4, 90, 78],
  ])('return correct cell size for gameLevel = %i', (gameLevel, width, height) => {
    const cellSize = getCellSize(gameLevel);

    expect(cellSize).toEqual({ width, height });
  });
});
