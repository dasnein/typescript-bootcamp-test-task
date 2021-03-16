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

import Cell from './Cell.vue';
import ErrorOverlay from './ErrorOverlay.vue';

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
