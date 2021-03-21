<template>
  <div
    class="cell"
    :class="cellClasses"
    :data-value="cell.value"
    :data-x="cell.x"
    :data-y="cell.y"
    :data-z="cell.z"
    :style="style"
  >
    <Hexagon :cell="cell" />
    <span v-if="cell.value > 0" class="cell__value">{{ cell.value }}</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { ANIMATIONS_NAMES } from '@/store/constants';
import { MUTATION_SET_CELL_ATTRIBUTES } from '@/store/mutations';

import getCellPosition from '@/helpers/get_cell_position';
import convertStyleProps from '@/helpers/convert_style_props';

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
      const { cellSize, fieldSize, cell } = this;
      const position = getCellPosition({ cellSize, fieldSize, cell });
      const style = convertStyleProps({ ...position, ...cellSize });

      return style;
    },
    cellClasses() {
      const { attention } = this.cell;

      return { attention };
    },
  },

  mounted() {
    this.$el.addEventListener('animationend', (e) => {
      if (e.animationName === ANIMATIONS_NAMES.ATTENTION) {
        const cellIndex = this.cell.index;
        const newAttributes = { attention: false };
        const payload = {
          cellIndex,
          newAttributes,
        };

        this.$store.commit(MUTATION_SET_CELL_ATTRIBUTES, payload);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.cell {
  position: absolute;
  user-select: none;
  transition: all 0.2s linear;
  animation-duration: 0.5s;
  animation-fill-mode: both;

  &.attention {
    animation-name: pulse;
    animation-timing-function: ease-in-out;
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
