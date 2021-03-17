export const DEFAULT_STROKE_WIDTH = 4;
export const DEFAULT_CELL_BACKGROUND_COLOR = '#fff';
export const GAME_FIELD_MIN_HEIGHT = 500;
export const GAME_FIELD_WIDTH = 500;
export const GAME_LEVELS = [2, 3, 4];
export const MAX_CELL_SIZE = {
  width: 200,
  height: 174,
};
export const BG_COLORS = {
  0: '#eeeeee',
  2: '#eee4da',
  4: '#ede0c8',
  8: '#f2b179',
  16: '#f59563',
  32: '#f67c5f',
  64: '#f65e3b',
  128: '#edcf72',
  256: '#edcc61',
  512: '#edc850',
  1024: '#edc53f',
  2048: '#edc22e',
};

export const SERVER_URL = '//68f02c80-3bed-4e10-a747-4ff774ae905a.pub.instances.scw.cloud';
export const REQUESTS_LIMIT = 3;
export const REQUESTS_TIMEOUT = 2 * 1000;

export default {
  BG_COLORS,
  DEFAULT_CELL_BACKGROUND_COLOR,
  DEFAULT_STROKE_WIDTH,
  GAME_FIELD_MIN_HEIGHT,
  GAME_FIELD_WIDTH,
  GAME_LEVELS,
  MAX_CELL_SIZE,
  REQUESTS_LIMIT,
  REQUESTS_TIMEOUT,
  SERVER_URL,
};
