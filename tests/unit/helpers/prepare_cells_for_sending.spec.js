import prepareCellsForSending from '@/helpers/prepare_cells_for_sending';

const CELLS = [{
  attention: false, value: 0, squashed: false, index: 'game_cell_0', x: 0, y: 1, z: -1,
}, {
  attention: false, value: 0, squashed: false, index: 'game_cell_1', x: 0, y: 0, z: 0,
}, {
  attention: false, value: 2, squashed: false, index: 'game_cell_2', x: 0, y: -1, z: 1,
}, {
  attention: false, value: 0, squashed: false, index: 'game_cell_3', x: 1, y: 0, z: -1,
}, {
  attention: false, value: 4, squashed: false, index: 'game_cell_4', x: -1, y: 1, z: 0,
}, {
  attention: false, value: 0, squashed: false, index: 'game_cell_5', x: 1, y: -1, z: 0,
}, {
  attention: false, value: 0, squashed: false, index: 'game_cell_6', x: -1, y: 0, z: 1,
}];

const CLEARED_CELLS = [{
  value: 2, x: 0, y: -1, z: 1,
}, {
  value: 4, x: -1, y: 1, z: 0,
}];

describe('helpers: prepare_cells_for_sending.js', () => {
  it('clear cells data before sending request', () => {
    const cleared = prepareCellsForSending(CELLS);

    expect(cleared).toEqual(CLEARED_CELLS);
  });
});
