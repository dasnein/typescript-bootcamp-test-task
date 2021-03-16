<template>
  <div class="game-field">
    <div class="cells-container" :style="fieldStyle">
      <Cell v-for="cell in cells" :key="cell.index" :cell="cell" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import Cell from './Cell.vue';

export default {
  name: 'GameField',

  components: {
    Cell,
  },

  computed: {
    ...mapState(['cells', 'cellSize', 'fieldSize', 'gameLevel']),
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
  height: 500px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
</style>
