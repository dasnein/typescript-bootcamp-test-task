<template>
  <div
    class="cell"
    data-value="0"
    :data-x="cell.x"
    :data-y="cell.y"
    :data-z="cell.z"
    :style="style"
  >
    <Hexagon :background-color="backgroundColor" />
    <span class="cell__value">{{ cell.value }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { BG_COLORS, DEFAULT_CELL_BACKGROUND_COLOR } from '@/config';

import Hexagon from './Hexagon.vue';

export default {
  name: 'Cell',

  components: { Hexagon },

  props: {
    cell: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState(['cellSize', 'fieldSize']),
    style() {
      const position = {
        top:
          (this.fieldSize.height - this.cellSize.height) / 2
          + this.cell.z * this.cellSize.height / 2
        - (this.cell.y * this.cellSize.height) / 2,
        left:
          (this.fieldSize.width - this.cellSize.width) / 2
          + this.cell.x * this.cellSize.height * 0.85,
      };

      const style = {
        ...position,
        ...this.cellSize,
      };

      Object.entries(style).forEach(([key, value]) => {
        style[key] = `${value}px`;
      });

      return style;
    },
    backgroundColor() {
      return BG_COLORS[this.cell.value] || DEFAULT_CELL_BACKGROUND_COLOR;
    },
  },
};
</script>

<style lang="scss" scoped>
.cell {
  position: absolute;
  user-select: none;

  .coords {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__value {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
  }
}
</style>
