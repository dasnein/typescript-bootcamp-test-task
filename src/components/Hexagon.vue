<template>
  <svg
    class="icon__hexagon"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="200"
    height="174"
    viewBox="0 0 200 174"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :style="svgStyle"
  >
    <polygon class="icon__hexagon__polygon" :points="points"></polygon>
  </svg>
</template>

<script>
import { mapState } from 'vuex';

import { DEFAULT_STROKE_WIDTH } from '@/config';

function getPoint(x, y) {
  return [x, y].join(',');
}

export default {
  name: 'Hexagon',

  props: {
    backgroundColor: {
      type: String,
      required: true,
    },
  },

  computed: {
    ...mapState(['cellSize', 'gameLevel']),
    points() {
      const strokeWidth = this.gameLevel < 4 ? DEFAULT_STROKE_WIDTH : 2;

      const { width, height } = this.cellSize;
      const padding = strokeWidth / 2;

      const p1 = getPoint(width - padding, height / 2);
      const p2 = getPoint(width * 0.75, height - padding);
      const p3 = getPoint(width * 0.25, height - padding);
      const p4 = getPoint(padding, height / 2);
      const p5 = getPoint(width * 0.25, padding);
      const p6 = getPoint(width * 0.75, padding);

      return [p1, p2, p3, p4, p5, p6].join(' ');
    },
    svgStyle() {
      return {
        fill: this.backgroundColor || '#fff',
      };
    },
  },
};
</script>

<style lang="scss">
.icon__hexagon {

  &__polygon {
    fill-opacity: 0.8;
    stroke: #000;
    stroke-width: 4;
  }
}
</style>
