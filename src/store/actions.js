import axios from 'axios';

import {
  GAME_FIELD_MIN_HEIGHT,
  GAME_FIELD_WIDTH,
  REQUESTS_LIMIT,
  REQUESTS_TIMEOUT,
} from '@/config';
import getCellSize from '@/helpers/get_cell_size';
import generateCells from '@/helpers/generate_cells';
import getFieldHeight from '@/helpers/get_field_height';
import generateStacks from '@/helpers/generate_stacks';
import prepareCellsForSending from '@/helpers/prepare_cells_for_sending';
import checkAvailableMoves from '@/helpers/check_available_moves';
import { AXIS_SORT_DEPENDENCY, GAME_STATUSES } from './constants';
import {
  MUTATION_SET_CELLS,
  MUTATION_SET_CELL_SIZE,
  MUTATION_SET_ERROR,
  MUTATION_SET_FIELD_SIZE,
  MUTATION_SET_GAME_LEVEL,
  MUTATION_SET_GAME_STATUS,
  MUTATION_SET_PROCESSING,
  MUTATION_SET_REQUESTS_COUNTER,
  MUTATION_SET_SERVER,
  MUTATION_SET_TURN_NUMBER,
} from './mutations';

export const ACTION_CHANGE_SERVER = 'actionChangeServer';
export const ACTION_INIT_GAME = 'actionInitGame';
export const ACTION_PLAYER_TURN = 'actionPlayerTurn';
const ACTION_FETCH_NEW_CELLS = 'actionFetchNewCells';
const ACTION_SET_CELL_SIZE = 'actionSetCellSize';
const ACTION_SET_FIELD_SIZE = 'actionSetFieldSize';
const ACTION_UPDATE_CELLS = 'actionUpdateCells';

export default {
  [ACTION_CHANGE_SERVER]({ commit, dispatch, state }, newServerUrl) {
    commit(MUTATION_SET_SERVER, newServerUrl);
    dispatch(ACTION_INIT_GAME, { gameLevel: state.gameLevel });
  },
  async [ACTION_FETCH_NEW_CELLS]({ commit, dispatch, state }) {
    commit(MUTATION_SET_PROCESSING, true);
    commit(MUTATION_SET_REQUESTS_COUNTER, state.requestsCounter + 1);

    const url = `${state.serverUrl}/${state.gameLevel}`;
    const filteredCells = prepareCellsForSending(state.cells);

    try {
      const { data } = await axios({
        method: 'post',
        url,
        data: filteredCells,
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
  async [ACTION_INIT_GAME]({ commit, dispatch, state }, { gameLevel = 2 } = {}) {
    const cells = generateCells({ gameLevel, turnNumber: state.turnNumber });

    commit(MUTATION_SET_TURN_NUMBER, 0);
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
      updatedCell.attention = true;
    });

    commit(MUTATION_SET_CELLS, updatedCells);
  },
  async [ACTION_PLAYER_TURN]({ commit, dispatch, state }, { axis, direction }) {
    let turnProcessed = false;

    // create stacks by action axis and sort them
    const sortAxis = AXIS_SORT_DEPENDENCY[axis];
    const stacks = generateStacks({
      cells: state.cells, axis, sortAxis, direction,
    });

    // turn logic
    Object.values(stacks).forEach((stack) => {
      for (let currentCellIndex = 1; currentCellIndex < stack.length; currentCellIndex++) {
        const currentCell = stack[currentCellIndex];

        if (currentCell.value > 0) {
          let prevCellIndex = currentCellIndex;

          while (prevCellIndex > 0) {
            prevCellIndex -= 1;

            if (stack[prevCellIndex].value > 0) {
              if (stack[prevCellIndex].value !== currentCell.value) {
                prevCellIndex += 1;
              }

              break;
            }
          }

          const prevCell = stack[prevCellIndex];

          if (prevCell.index !== currentCell.index) {
            if (prevCell.value === 0) {
              // move cell
              const { value } = currentCell;

              prevCell.value = value;
              currentCell.value = 0;
              turnProcessed = true;
            } else if (prevCell.value === currentCell.value) {
              // squash cells
              const { value } = currentCell;

              prevCell.value += value;
              prevCell.squashed = true;
              currentCell.value = 0;
              turnProcessed = true;
            }
          }
        }
      }
    });

    const resetAttributes = { squashed: false };
    const updatedCells = Object.values(stacks)
      .flat()
      .map((cell) => ({ ...cell, ...resetAttributes }));

    if (turnProcessed) {
      commit(MUTATION_SET_CELLS, updatedCells);
      await dispatch(ACTION_FETCH_NEW_CELLS);
    }

    const isAvailableMoves = checkAvailableMoves(state.cells);

    if (!isAvailableMoves) {
      commit(MUTATION_SET_GAME_STATUS, GAME_STATUSES.GAME_OVER);
    }
  },
};
