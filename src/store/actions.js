import axios from 'axios';

import {
  GAME_FIELD_MIN_HEIGHT, GAME_FIELD_WIDTH, REQUESTS_LIMIT, REQUESTS_TIMEOUT, SERVER_URL,
} from '@/config';
import getCellSize from '@/helpers/get_cell_size';
import getCellsQuantity from '@/helpers/get_cells_quantity';
import generateCells from '@/helpers/generate_cells';
import getFieldHeight from '@/helpers/get_field_height';
import { GAME_STATUSES } from './constants';
import {
  MUTATION_SET_CELLS,
  MUTATION_SET_CELL_SIZE,
  MUTATION_SET_CELLS_QUANTITY,
  MUTATION_SET_ERROR,
  MUTATION_SET_FIELD_SIZE,
  MUTATION_SET_GAME_LEVEL,
  MUTATION_SET_GAME_STATUS,
  MUTATION_SET_PROCESSING,
  MUTATION_SET_REQUESTS_COUNTER,
} from './mutations';

export const ACTION_INIT_GAME = 'actionInitGame';
export const ACTION_PLAYER_TURN = 'actionPlayerTurn';
const ACTION_FETCH_NEW_CELLS = 'actionFetchNewCells';
const ACTION_SET_CELL_SIZE = 'actionSetCellSize';
const ACTION_SET_FIELD_SIZE = 'actionSetFieldSize';
const ACTION_UPDATE_CELLS = 'actionUpdateCells';

export default {
  async [ACTION_FETCH_NEW_CELLS]({ commit, dispatch, state }) {
    commit(MUTATION_SET_PROCESSING, true);
    commit(MUTATION_SET_REQUESTS_COUNTER, state.requestsCounter + 1);

    const url = `${SERVER_URL}/${state.gameLevel}`;
    const cellsWithoutValue = state.cells.filter((cell) => cell.value > 0);

    try {
      const { data } = await axios({
        method: 'post',
        url,
        data: cellsWithoutValue,
      });

      commit(MUTATION_SET_ERROR, false);
      commit(MUTATION_SET_PROCESSING, false);
      commit(MUTATION_SET_REQUESTS_COUNTER, 0);
      dispatch(ACTION_UPDATE_CELLS, data);
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
  async [ACTION_INIT_GAME]({ commit, dispatch }, { gameLevel = 2 } = {}) {
    const cellsQuantity = getCellsQuantity(gameLevel);
    const cells = generateCells(gameLevel);

    commit(MUTATION_SET_CELLS_QUANTITY, cellsQuantity);
    commit(MUTATION_SET_CELLS, cells);
    commit(MUTATION_SET_GAME_LEVEL, gameLevel);
    dispatch(ACTION_SET_CELL_SIZE);
    dispatch(ACTION_SET_FIELD_SIZE);
    await dispatch(ACTION_FETCH_NEW_CELLS);
    commit(MUTATION_SET_GAME_STATUS, GAME_STATUSES.PLAYING);
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
  [ACTION_UPDATE_CELLS]({ commit, state }, newCells) {
    const updatedCells = Array.from(state.cells);

    newCells.forEach((cell) => {
      const updatedCell = updatedCells.find(
        (c) => c.x === cell.x && c.y === cell.y && c.z === cell.z,
      );
      updatedCell.value = cell.value;
    });

    commit(MUTATION_SET_CELLS, updatedCells);
  },
  [ACTION_PLAYER_TURN]({ state }, { axis = 'x', direction = 'desc' } = {}) {
    console.log('::: ACTION_TURN');
    console.log(state.cells);
    console.log('axis: ', axis);
    console.log('direction: ', direction);
  },
};
