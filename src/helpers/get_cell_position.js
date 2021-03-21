export default function getCellPosition({ cellSize, fieldSize, cell }) {
  const position = {
    top:
      (fieldSize.height - cellSize.height) / 2
      + (cell.z * cellSize.height) / 2
      - (cell.y * cellSize.height) / 2,
    left:
      (fieldSize.width - cellSize.width) / 2
      + cell.x * cellSize.height * 0.85,
  };

  return position;
}
