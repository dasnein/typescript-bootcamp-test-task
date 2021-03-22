import generateCells from '@/helpers/generate_cells';

const CELLS = {
  1: [{
    attention: false, value: 0, squashed: false, index: 'game_cell_0', x: 0, y: 0, z: 0,
  }],
  2: [{
    attention: false, value: 0, squashed: false, index: 'game_cell_0', x: 0, y: 1, z: -1,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_1', x: 0, y: 0, z: 0,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_2', x: 0, y: -1, z: 1,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_3', x: 1, y: 0, z: -1,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_4', x: -1, y: 1, z: 0,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_5', x: 1, y: -1, z: 0,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_6', x: -1, y: 0, z: 1,
  }],
  3: [{
    attention: false, value: 0, squashed: false, index: 'game_cell_0', x: 0, y: 2, z: -2,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_1', x: 0, y: 1, z: -1,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_2', x: 0, y: 0, z: 0,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_3', x: 0, y: -1, z: 1,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_4', x: 0, y: -2, z: 2,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_5', x: 1, y: 1, z: -2,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_6', x: -1, y: 2, z: -1,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_7', x: 1, y: 0, z: -1,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_8', x: -1, y: 1, z: 0,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_9', x: 1, y: -1, z: 0,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_10', x: -1, y: 0, z: 1,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_11', x: 1, y: -2, z: 1,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_12', x: -1, y: -1, z: 2,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_13', x: 2, y: 0, z: -2,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_14', x: -2, y: 2, z: 0,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_15', x: 2, y: -1, z: -1,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_16', x: -2, y: 1, z: 1,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_17', x: 2, y: -2, z: 0,
  }, {
    attention: false, value: 0, squashed: false, index: 'game_cell_18', x: -2, y: 0, z: 2,
  }],
};

describe('helpers: generate_cells.js', () => {
  it.each`
  gameLevel     | cellsQuantity
  ${1}          | ${1}
  ${2}          | ${7}
  ${3}          | ${19}
`('correctly generate cells for gameLevel = $gameLevel', ({ gameLevel, cellsQuantity }) => {
  const cells = generateCells({ gameLevel });

  expect(cells).toEqual(CELLS[gameLevel]);
  expect(cells.length).toBe(cellsQuantity);
});
});
