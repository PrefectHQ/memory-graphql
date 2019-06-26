<template>
  <div id="app" class="app">
    <img class="logo" alt="Vue logo" src="./assets/logomark-color.svg" />
    <MemoryGame /> `
  </div>
</template>

<script>
import MemoryGame from "./components/MemoryGame.vue";

export default {
  name: "app",
  components: {
    MemoryGame
  }
};
</script>

<style lang="scss">
.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 3rem;
}

.logo {
  height: 15rem;
}
</style>
