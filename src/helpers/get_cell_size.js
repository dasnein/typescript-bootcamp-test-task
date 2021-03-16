import { GAME_FIELD_WIDTH, MAX_CELL_SIZE } from '@/config';

export function getCellWidth(level) {
  const segmentsQuantity = level * 3 * 2 - 2;

  return Math.min(Math.floor(GAME_FIELD_WIDTH * 4 / segmentsQuantity), MAX_CELL_SIZE.width);
}

export function getCellHeight(cellWidth) {
  return Math.min(Math.floor(cellWidth * 0.87), MAX_CELL_SIZE.height);
}

export default function getCellSize(level) {
  const width = getCellWidth(level);
  const height = getCellHeight(width);

  return {
    width,
    height,
  };
}
