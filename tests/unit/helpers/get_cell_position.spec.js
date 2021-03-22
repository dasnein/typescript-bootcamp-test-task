import getCellPosition from '@/helpers/get_cell_position';

const TEST_DATA = [
  [{
    fieldSize: { width: 500, height: 522 },
    cellSize: { width: 200, height: 174 },
    cell: {
      attention: false, value: 0, squashed: false, index: 'game_cell_0', x: 0, y: 0, z: 0,
    },
  },
  174, 150],
  [{
    fieldSize: { width: 500, height: 546 },
    cellSize: { width: 90, height: 78 },
    cell: {
      attention: false, value: 0, squashed: false, index: 'game_cell_0', x: 0, y: 0, z: 0,
    },
  },
  234, 205],
];

describe('helpers: get_cell_position.js', () => {
  it.each(TEST_DATA)('return correct cell position', ({ cellSize, fieldSize, cell }, top, left) => {
    const position = getCellPosition({ cellSize, fieldSize, cell });

    expect(position).toEqual({ top, left });
  });
});
