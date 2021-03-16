import { GAME_FIELD_WIDTH } from '@/config';

export function getCellWidth(level) {
  const segmentsQuantity = level * 3 * 2 - 2;

  return Math.floor(GAME_FIELD_WIDTH * 4 / segmentsQuantity);
}

export function getCellHeight(cellWidth) {
  return Math.floor(cellWidth * 0.87);
}

export default function getCellSize(level) {
  const width = getCellWidth(level);
  const height = getCellHeight(width);

  return {
    width,
    height,
  };
}
