import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import {
  GAME_FIELD_MIN_HEIGHT, GAME_FIELD_WIDTH, REQUESTS_LIMIT, REQUESTS_TIMEOUT, SERVER_URL,
} from '@/config';
import getCellSize from '@/helpers/get_cell_size';
import getCellsQuantity from '@/helpers/get_cells_quantity';
import generateCells from '@/helpers/generate_cells';
import getFieldHeight from '@/helpers/get_field_height';

Vue.use(Vuex);

export const ACTION_INIT_GAME = 'actionInitGame';
export const ACTION_FETCH_NEW_CELLS = 'actionFetchNewCells';
export const ACTION_SET_CELL_SIZE = 'actionSetCellSize';
export const ACTION_SET_FIELD_SIZE = 'actionSetFieldSize';

const MUTATION_SET_CELLS = 'mutationSetCells';
const MUTATION_SET_CELL_SIZE = 'mutationSetCellSize';
const MUTATION_SET_CELLS_QUANTITY = 'mutationSetCellsQuantity';
const MUTATION_SET_ERROR = 'mutationSetError';
const MUTATION_SET_FIELD_SIZE = 'mutationSetFieldSize';
const MUTATION_SET_GAME_LEVEL = 'mutationSetGameLevel';
const MUTATION_SET_GAME_STATUS = 'mutationSetGameStatus';
const MUTATION_SET_PROCESSING = 'mutationSetProcessing';
const MUTATION_SET_REQUESTS_COUNTER = 'mutationSetRequestsCounter';

export const GAME_STATUSES = {
  ROUND_SELECT: 'round-select',
  PLAYING: 'playing',
  GAME_OVER: 'game-over',
};

export default new Vuex.Store({
  state: {
    processing: false,
    error: false,
    requestsCounter: 0,
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
    async [ACTION_FETCH_NEW_CELLS]({ commit, dispatch, state }) {
      const url = `${SERVER_URL}/${state.gameLevel}`;

      commit(MUTATION_SET_PROCESSING, true);
      commit(MUTATION_SET_REQUESTS_COUNTER, state.requestsCounter + 1);

      try {
        const { data } = await axios({
          method: 'post',
          url,
          data: [],
        });

        console.log(data);
        commit(MUTATION_SET_ERROR, false);
        commit(MUTATION_SET_PROCESSING, false);
        commit(MUTATION_SET_REQUESTS_COUNTER, 0);
      } catch (error) {
        commit(MUTATION_SET_ERROR, true);

        if (state.requestsCounter < REQUESTS_LIMIT) {
          setTimeout(() => {
            dispatch(ACTION_FETCH_NEW_CELLS);
          }, REQUESTS_TIMEOUT);
        } else {
          commit(MUTATION_SET_PROCESSING, false);
          commit(MUTATION_SET_REQUESTS_COUNTER, 0);
        }
      }
    },
    [ACTION_INIT_GAME]({ commit, dispatch }, { gameLevel = 2 } = {}) {
      const cellsQuantity = getCellsQuantity(gameLevel);
      const cells = generateCells(gameLevel);

      commit(MUTATION_SET_CELLS_QUANTITY, cellsQuantity);
      commit(MUTATION_SET_CELLS, cells);
      commit(MUTATION_SET_GAME_LEVEL, gameLevel);
      commit(MUTATION_SET_GAME_STATUS, GAME_STATUSES.PLAYING);
      dispatch(ACTION_SET_CELL_SIZE);
      dispatch(ACTION_SET_FIELD_SIZE);
      dispatch(ACTION_FETCH_NEW_CELLS);
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
  },
});
