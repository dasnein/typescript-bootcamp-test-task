import Vue from 'vue';
import Vuex from 'vuex';

import { GAME_STATUSES } from './constants';

import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    processing: false,
    error: false,
    requestsCounter: 0,
    turnNumber: 0,
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
    cells: [],
  },
  actions,
  mutations,
});
