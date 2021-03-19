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
  81: {
    key: 'Q',
    axis: 'z',
    direction: 'down',
  },
  87: {
    key: 'W',
    axis: 'x',
    direction: 'up',
  },
  69: {
    key: 'E',
    axis: 'y',
    direction: 'up',
  },
  65: {
    key: 'A',
    axis: 'y',
    direction: 'down',
  },
  83: {
    key: 'S',
    axis: 'x',
    direction: 'down',
  },
  68: {
    key: 'D',
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
      const { keyCode } = e;

      if (keyCode in KEY_CODES) {
        const { axis, direction } = KEY_CODES[keyCode];

        this.$store.dispatch(ACTION_PLAYER_TURN, { axis, direction });
      }
    },
  },

  mounted() {
    document.addEventListener('keydown', this.onkeydown);
  },

  beforeDestroy() {
    document.removeEventListener('keydown', this.onkeydown);
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
