<template>
  <div class="error-overlay">
    <h3 v-if="processing">Connection error. Retrying...</h3>
    <template v-else>
      <h3>Connection error.</h3>
      <button>Retry</button>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ErrorOverlay',

  computed: {
    ...mapState(['processing']),
  },
};
</script>

<style lang="scss">
.error-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(128, 128, 128, 0.9);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9;

  h3 {
    font-size: 2em;
    color: #fff;
    text-shadow: #000 0 1px 2px;
  }

  button {
    appearance: none;
    margin-top: 15px;
    font-size: 1.4em;
    padding: 0.25em 1em;
    border: 1px solid rgba(0, 0, 0, 0.5);
    background-color: rgba(255, 255, 255, 0.6);

    &:hover {
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.9);
    }
  }
}
</style>
