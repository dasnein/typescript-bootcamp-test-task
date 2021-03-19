<template>
  <div id="app">
    <Header />
    <GameField v-if="showGameField" />
    <Footer />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { GAME_STATUSES } from '@/store/constants';
import { ACTION_INIT_GAME } from '@/store/actions';
import { GAME_LEVELS } from '@/config';

import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import GameField from './components/GameField.vue';

export default {
  name: 'App',

  components: {
    Header,
    Footer,
    GameField,
  },

  computed: {
    ...mapState(['status']),
    showGameField() {
      return this.status !== GAME_STATUSES.ROUND_SELECT;
    },
  },

  mounted() {
    const { hash } = window.location;

    if (hash) {
      const gameLevel = +hash.replace('#test', '');

      if (GAME_LEVELS.includes(gameLevel)) {
        this.$store.dispatch(ACTION_INIT_GAME, { gameLevel });
      }
    }
  },
};
</script>

<style lang="scss">
/*
* STYLE RESET
*/
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

ul {
  list-style-type: none;
}
/* END STYLE RESET */

#app {
  width: 640px;
  height: auto;
  margin: 0 auto;
  font-family: 'Courier New', Courier, monospace;
}
</style>
