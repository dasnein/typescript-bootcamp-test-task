<template>
  <footer>
    <h5>Game Status: <span :data-status="status">{{ status }}</span></h5>
    <i>Use q, w, e, a, s, d keys for move</i>
  </footer>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Footer',

  computed: {
    ...mapState(['status']),
  },
};
</script>

<style lang="scss">
footer {
  padding-bottom: 1em;

  h5 {
    font-size: 1em;
    padding: 1em 0;
  }

  i {
    font-size: 1em;
  }
}
</style>
