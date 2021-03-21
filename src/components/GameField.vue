<template>
  <div class="game-field">
    <ErrorOverlay v-if="error" />
    <div class="cells-container" :style="fieldStyle">
      <div class="animations-container">
        <Animation
          v-for="animation in animations"
          :key="animation.index"
          :cell="animation"
        />
      </div>
      <Cell v-for="cell in cells" :key="cell.index" :cell="cell" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { ACTION_PLAYER_TURN } from '@/store/actions';

import Animation from './Animation.vue';
import Cell from './Cell.vue';
import ErrorOverlay from './ErrorOverlay.vue';

const KEY_CODES = {
  KeyQ: {
    axis: 'z',
    direction: 'down',
  },
  KeyW: {
    axis: 'x',
    direction: 'up',
  },
  KeyE: {
    axis: 'y',
    direction: 'up',
  },
  KeyA: {
    axis: 'y',
    direction: 'down',
  },
  KeyS: {
    axis: 'x',
    direction: 'down',
  },
  KeyD: {
    axis: 'z',
    direction: 'up',
  },
};

export default {
  name: 'GameField',

  components: {
    Animation,
    Cell,
    ErrorOverlay,
  },

  computed: {
    ...mapState([
      'animations',
      'cells',
      'cellSize',
      'error',
      'fieldSize',
      'gameLevel',
    ]),
    fieldStyle() {
      const { height, width } = this.fieldSize;

      return {
        width: `${width}px`,
        height: `${height}px`,
      };
    },
  },

  methods: {
    onkeydown(e) {
      const { code } = e;

      if (code in KEY_CODES) {
        const { axis, direction } = KEY_CODES[code];

        this.$store.dispatch(ACTION_PLAYER_TURN, { axis, direction });
      }
    },
  },

  mounted() {
    window.addEventListener('keypress', this.onkeydown);
  },

  beforeDestroy() {
    window.removeEventListener('keypress', this.onkeydown);
  },
};
</script>

<style lang="scss">
.game-field {
  position: relative;
  width: 640px;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 0;

  .cells-container {
    position: relative;

    .animations-container {
      z-index: 2;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
}
</style>
