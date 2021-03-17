export const MUTATION_SET_CELLS = 'mutationSetCells';
export const MUTATION_SET_CELL_SIZE = 'mutationSetCellSize';
export const MUTATION_SET_CELLS_QUANTITY = 'mutationSetCellsQuantity';
export const MUTATION_SET_ERROR = 'mutationSetError';
export const MUTATION_SET_FIELD_SIZE = 'mutationSetFieldSize';
export const MUTATION_SET_GAME_LEVEL = 'mutationSetGameLevel';
export const MUTATION_SET_GAME_STATUS = 'mutationSetGameStatus';
export const MUTATION_SET_PROCESSING = 'mutationSetProcessing';
export const MUTATION_SET_REQUESTS_COUNTER = 'mutationSetRequestsCounter';

export default {
  [MUTATION_SET_CELLS](state, newCells) {
    state.cells = newCells;
  },
  [MUTATION_SET_CELLS_QUANTITY](state, cellsQuantity) {
    state.cellsQuantity = cellsQuantity;
  },
  [MUTATION_SET_CELL_SIZE](state, newSize) {
    state.cellSize = newSize;
  },
  [MUTATION_SET_ERROR](state, newErrorState) {
    state.error = newErrorState;
  },
  [MUTATION_SET_FIELD_SIZE](state, newSize) {
    state.fieldSize = newSize;
  },
  [MUTATION_SET_GAME_LEVEL](state, newLevel = 2) {
    state.gameLevel = newLevel;
  },
  [MUTATION_SET_GAME_STATUS](state, newStatus) {
    state.status = newStatus;
  },
  [MUTATION_SET_PROCESSING](state, newProcessingState = false) {
    state.processing = newProcessingState;
  },
  [MUTATION_SET_REQUESTS_COUNTER](state, newCounter = 0) {
    state.requestsCounter = newCounter;
  },
};
