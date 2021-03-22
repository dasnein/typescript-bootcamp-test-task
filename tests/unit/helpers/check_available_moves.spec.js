import checkAvailableMoves from '@/helpers/check_available_moves';

const cells = [
  {
    value: 2, x: 1, y: -1, z: 0,
  },
  {
    value: 32, x: 0, y: 0, z: 0,
  },
  {
    value: 4, x: -1, y: 1, z: 0,
  },
  {
    value: 8, x: 0, y: -1, z: 1,
  },
  {
    value: 16, x: -1, y: 0, z: 1,
  },
  {
    value: 4, x: 1, y: 0, z: -1,
  },
  {
    value: 2, x: 0, y: 1, z: -1,
  },
];

describe('helpers: check_available_moves.js', () => {
  it('there are no available moves', () => {
    expect(checkAvailableMoves(cells)).toBe(false);
  });

  it('there are free cells', () => {
    const testCells = [...cells];
    testCells[0].value = 0;

    expect(checkAvailableMoves(testCells)).toBe(true);
  });

  it('there are similar cells', () => {
    const testCells = [...cells];
    testCells[0].value = testCells[1].value;

    expect(checkAvailableMoves(testCells)).toBe(true);
  });
});
