export const MUTATION_DESTROY_CELL = 'mutationDestroyCell';
export const MUTATION_SET_CELLS = 'mutationSetCells';
export const MUTATION_SET_CELL_ATTRIBUTES = 'mutationSetCellAttributes';
export const MUTATION_SET_CELL_SIZE = 'mutationSetCellSize';
export const MUTATION_SET_ERROR = 'mutationSetError';
export const MUTATION_SET_FIELD_SIZE = 'mutationSetFieldSize';
export const MUTATION_SET_GAME_LEVEL = 'mutationSetGameLevel';
export const MUTATION_SET_GAME_STATUS = 'mutationSetGameStatus';
export const MUTATION_SET_PROCESSING = 'mutationSetProcessing';
export const MUTATION_SET_REQUESTS_COUNTER = 'mutationSetRequestsCounter';
export const MUTATION_SET_TURN_NUMBER = 'mutationSetTurnNumber';

export default {
  [MUTATION_DESTROY_CELL](state, cell) {
    const cellIndex = state.cells.findIndex((c) => c.index === cell.index);

    state.cells.splice(cellIndex, 1);
  },
  [MUTATION_SET_CELLS](state, newCells) {
    state.cells = newCells;
  },
  [MUTATION_SET_CELL_ATTRIBUTES](state, { cellIndex, newAttributes = {} } = {}) {
    if (cellIndex) {
      const cell = state.cells.find((c) => c.index === cellIndex);

      if (cell) {
        Object.assign(cell, newAttributes);
      }
    }
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
  [MUTATION_SET_TURN_NUMBER](state, newTurnNumber = 0) {
    state.turnNumber = newTurnNumber;
  },
};
