export default function getCellsQuantity(gameLevel) {
  let cellsQuantity = 0;

  for (let i = 0; i < gameLevel - 1; i++) {
    cellsQuantity += gameLevel + i;
  }

  cellsQuantity = cellsQuantity * 2 + gameLevel * 2 - 1;

  return cellsQuantity;
}
