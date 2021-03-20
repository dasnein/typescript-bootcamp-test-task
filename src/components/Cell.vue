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
    <!-- TODO: delete <small> tag -->
    <small
      style="
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        padding-top: 6em;
        text-align: center;
        line-height: 1.25em;
      "
      v-html="
        [cell.x, cell.y, cell.z] +
        '<br>' +
        cell.index +
        //'<br> att: ' +
        //!!cell.attention +
        '<br> sq: ' +
        !!cell.squashed
      "
    ></small>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import {
  MUTATION_DESTROY_CELL,
  MUTATION_SET_CELL_ATTRIBUTES,
} from '@/store/mutations';

import Hexagon from './Hexagon.vue';

const ANIMATIONS_NAMES = {
  ATTENTION: 'pulse',
  DESTROY: 'destroy',
};

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
          + (this.cell.z * this.cellSize.height) / 2
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
    cellClasses() {
      const { attention, destroy } = this.cell;

      return { attention, destroy };
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
        return;
      }

      if (e.animationName === ANIMATIONS_NAMES.DESTROY) {
        this.$store.commit(MUTATION_DESTROY_CELL, this.cell);
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

  &.destroy {
    animation-name: destroy;
    animation-timing-function: linear;
  }

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
