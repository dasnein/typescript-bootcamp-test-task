<template>
  <div id="app">
    <Header />
    <GameField />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import GameField from './components/GameField.vue';

export default {
  name: 'App',

  components: {
    Header,
    Footer,
    GameField,
  },
};
</script>

<style lang="scss">
/*
* STYLE RESET
*/
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

ul {
  list-style-type: none;
}
/* END STYLE RESET */

#app {
  width: 640px;
  height: auto;
  margin: 0 auto;
  font-family: 'Courier New', Courier, monospace;
}
</style>
