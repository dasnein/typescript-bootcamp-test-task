<template>
  <header>
    <h2>Select game level:</h2>
    <nav class="game-levels">
      <a
        v-for="gameLevel in gameLevels"
        :key="gameLevel.level"
        href="#"
        class="game-levels__level"
        :class="{ 'game-levels__level-active' : gameLevel.active }"
        @click.prevent="initGame(gameLevel.level)"
        >{{ gameLevel.level }}</a
      >
    </nav>
    <!-- <pre v-html="$store.state"></pre> -->
  </header>
</template>

<script>
import { mapState } from 'vuex';

import { ACTION_INIT_GAME } from '@/store/actions';
import { GAME_LEVELS } from '@/config';

export default {
  name: 'Header',

  computed: {
    ...mapState(['gameLevel']),
    gameLevels() {
      const levels = GAME_LEVELS.map((level) => ({
        level,
        active: level === this.gameLevel,
      }));

      return levels;
    },
  },

  methods: {
    initGame(gameLevel) {
      this.$store.dispatch(ACTION_INIT_GAME, { gameLevel });
    },
  },
};
</script>

<style lang="scss">
header {
  width: 100%;
  padding: 10px;
  background-color: rgba(128, 128, 128, 0.1);
  border: 1px solid rgba(128, 128, 128, 0.1);
  margin-top: 10px;
  border-radius: 5px;

  h2 {
    text-align: center;
  }

  .game-levels {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    margin-top: 16px;

    &__level {
      width: 100px;
      line-height: 2em;
      font-size: 1em;
      text-align: center;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background-color: rgba(255, 255, 255, 0.2);
      text-decoration: none;
      color: #000;
      font-weight: 600;

      &:hover {
        background-color: rgba(255, 255, 255, 0.8);
      }

      &-active {
        border: 1px solid rgba(0, 128, 0, 0.2);
        background-color: rgba(192, 255, 192, 0.4);

        &:hover {
          background-color: rgba(192, 255, 192, 0.7);
        }
      }
    }
  }
}
</style>
