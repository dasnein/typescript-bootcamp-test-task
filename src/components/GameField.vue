<template>
  <div class="game-field">
    <ErrorOverlay v-if="error" />
    <div class="cells-container" :style="fieldStyle">
      <Cell v-for="cell in cells" :key="cell.index" :cell="cell" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { ACTION_PLAYER_TURN } from '@/store/actions';

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
    Cell,
    ErrorOverlay,
  },

  computed: {
    ...mapState(['error', 'cells', 'cellSize', 'fieldSize', 'gameLevel']),
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
  }
}
</style>
