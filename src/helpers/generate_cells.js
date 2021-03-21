/*
Cell structure:
{
  x: 0,
  y: 0,
  z: 0,
  value: 0,
  index: '12b4',

  // turn flags:
  attention: false, // play attention animation on cell
  squashed: false,  // is cell squashed with another at this turn
}
*/

const defaultCellAttributes = {
  attention: false,
  value: 0,
  squashed: false,
};

export default function generateCells({ gameLevel }) {
  const cells = [];
  let cellsCounter = 0;

  // central col
  for (let i = 0; i < gameLevel * 2 - 1; i++) {
    cells.push({
      ...defaultCellAttributes,
      index: `game_cell_${cellsCounter}`,
      x: 0,
      y: gameLevel - 1 - i,
      z: -gameLevel + 1 + i,
    });

    cellsCounter++;
  }

  // other cols
  for (let i = 0; i < gameLevel - 1; i++) {
    const itemsInCol = gameLevel * 2 - 2 - i;

    for (let j = 0; j < itemsInCol; j++) {
      const newCellRight = {
        ...defaultCellAttributes,
        index: `game_cell_${cellsCounter}`,
        x: i + 1,
        y: gameLevel - 2 - j - i,
        z: -gameLevel + 1 + j,
      };

      cellsCounter++;

      const newCellLeft = {
        ...defaultCellAttributes,
        index: `game_cell_${cellsCounter}`,
        x: -1 - i,
        y: gameLevel - 1 - j,
        z: -gameLevel + 2 + j + i,
      };

      cellsCounter++;

      cells.push(newCellRight);
      cells.push(newCellLeft);
    }
  }

  return cells;
}
