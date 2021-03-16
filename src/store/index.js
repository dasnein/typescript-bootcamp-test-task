import Vue from 'vue';
import Vuex from 'vuex';

import { GAME_FIELD_MIN_HEIGHT, GAME_FIELD_WIDTH } from '@/config';
import getCellSize from '@/helpers/get_cell_size';
import getCellsQuantity from '@/helpers/get_cells_quantity';
import generateCells from '@/helpers/generate_cells';
import getFieldHeight from '@/helpers/get_field_height';

Vue.use(Vuex);

export const ACTION_INIT_GAME = 'actionInitGame';
const ACTION_SET_CELL_SIZE = 'actionSetCellSize';
const ACTION_SET_FIELD_SIZE = 'actionSetFieldSize';

const MUTATION_SET_CELLS = 'mutationSetCells';
const MUTATION_SET_CELL_SIZE = 'mutationSetCellSize';
const MUTATION_SET_CELLS_QUANTITY = 'mutationSetCellsQuantity';
const MUTATION_SET_FIELD_SIZE = 'mutationSetFieldSize';
const MUTATION_SET_GAME_LEVEL = 'mutationSetGameLevel';
const MUTATION_SET_GAME_STATUS = 'mutationSetGameStatus';

export const GAME_STATUSES = {
  ROUND_SELECT: 'round-select',
  PLAYING: 'playing',
  GAME_OVER: 'game-over',
};

export default new Vuex.Store({
  state: {
    gameLevel: 0,
    status: GAME_STATUSES.ROUND_SELECT,
    fieldSize: {
      width: 0,
      height: 0,
    },
    cellSize: {
      width: 0,
      height: 0,
    },
    cellsQuantity: 0,
    cells: [],
  },
  actions: {
    [ACTION_INIT_GAME]({ commit, dispatch }, { gameLevel = 2 } = {}) {
      const cellsQuantity = getCellsQuantity(gameLevel);
      const cells = generateCells(gameLevel);

      commit(MUTATION_SET_CELLS_QUANTITY, cellsQuantity);
      commit(MUTATION_SET_CELLS, cells);
      commit(MUTATION_SET_GAME_LEVEL, gameLevel);
      commit(MUTATION_SET_GAME_STATUS, GAME_STATUSES.PLAYING);
      dispatch(ACTION_SET_CELL_SIZE);
      dispatch(ACTION_SET_FIELD_SIZE);
    },
    [ACTION_SET_CELL_SIZE]({ commit, state }) {
      const size = getCellSize(state.gameLevel);

      commit(MUTATION_SET_CELL_SIZE, size);
    },
    [ACTION_SET_FIELD_SIZE]({ commit, state }) {
      const { cellSize, gameLevel } = state;
      const fieldWidth = GAME_FIELD_WIDTH;
      const fieldHeight = Math.max(
        GAME_FIELD_MIN_HEIGHT,
        getFieldHeight(gameLevel, cellSize.height),
      );

      commit(MUTATION_SET_FIELD_SIZE, {
        width: fieldWidth,
        height: fieldHeight,
      });
    },
  },
  mutations: {
    [MUTATION_SET_CELLS](state, newCells) {
      state.cells = newCells;
    },
    [MUTATION_SET_CELLS_QUANTITY](state, cellsQuantity) {
      state.cellsQuantity = cellsQuantity;
    },
    [MUTATION_SET_CELL_SIZE](state, newSize) {
      state.cellSize = newSize;
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
  },
});
