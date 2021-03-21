<template>
  <div class="animation" :style="style">
    <Hexagon :cell="stateCell" :border="false" />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import { ANIMATIONS_NAMES } from '@/store/constants';
import { MUTATION_DESTROY_ANIMATION } from '@/store/mutations';

import getCellPosition from '@/helpers/get_cell_position';
import convertStyleProps from '@/helpers/convert_style_props';

import Hexagon from './Hexagon.vue';

export default {
  name: 'Animation',

  components: { Hexagon },

  props: {
    cell: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      stateCell: this.cell.from,
    };
  },

  computed: {
    ...mapState(['cellSize', 'fieldSize']),
    style() {
      const { cellSize, fieldSize, stateCell: cell } = this;
      const position = getCellPosition({ cellSize, fieldSize, cell });
      const style = convertStyleProps({ ...position, cellSize });

      return style;
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.stateCell = this.cell.to;
    });

    this.$el.addEventListener('animationend', (e) => {
      if (e.animationName === ANIMATIONS_NAMES.DESTROY) {
        this.$store.commit(MUTATION_DESTROY_ANIMATION, this.cell);
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.animation {
  position: absolute;
  user-select: none;
  transition: all 0.2s linear;
  animation-duration: 0.2s;
  animation-fill-mode: both;
  animation-name: destroy;
  animation-timing-function: linear;
}
</style>
