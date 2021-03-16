export default function generateCells(gameLevel) {
  const cells = [];

  // central col
  for (let i = 0; i < gameLevel * 2 - 1; i++) {
    cells.push({
      x: 0,
      y: gameLevel - 1 - i,
      z: -gameLevel + 1 + i,
    });
  }

  // other cols
  for (let i = 0; i < gameLevel - 1; i++) {
    const itemsInCol = gameLevel * 2 - 2 - i;

    for (let j = 0; j < itemsInCol; j++) {
      const newCellRight = {
        x: i + 1,
        y: gameLevel - 2 - j - i,
        z: -gameLevel + 1 + j,
      };

      const newCellLeft = {
        x: -1 - i,
        y: gameLevel - 1 - j,
        z: -gameLevel + 2 + j + i,
      };

      cells.push(newCellRight);
      cells.push(newCellLeft);
    }
  }

  // set initial value and index
  cells.forEach((cell, i) => {
    cells[i].value = 0;
    cells[i].index = `game_cell_${i}`;
  });

  return cells;
}
