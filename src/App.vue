<template>
  <GameContainer />
</template>

<script setup lang="ts">
import GameContainer from "./components/GameContainer.vue";
</script>

<style>
/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  touch-action: manipulation;
  user-select: none;
}
*/ html {
  font-size: 62.5%;
  overflow: hidden;
}

body,
.game-container {
  background-color: var(--col-light-grey);
}

html,
body,
.game-container {
  height: 100dvh;
}

/* Media queries */
@media (max-width: 380px) {
  html {
    font-size: 50%;
  }
  .game-container {
    gap: 1rem;
  }
  .game-ctrl {
    flex-direction: row;
  }
}
</style>
