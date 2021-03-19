export default function prepareCellsForSending(cells) {
  const nonEmptyCells = Array.from(cells).filter((cell) => cell.value > 0);
  const processedCells = nonEmptyCells.map(({
    x, y, z, value,
  }) => ({
    x, y, z, value,
  }));

  return processedCells;
}
