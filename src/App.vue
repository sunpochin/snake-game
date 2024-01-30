<template>
  <GameContainer />
</template>

<script setup lang="ts">
import GameContainer from "./components/GameContainer.vue";
</script>

<style>
/* Variables */
/* :root {
  --col-prim: #91dd2e;
  --col-sec: #37a35f;
  --col-food-apple: #e03131;
  --col-light-grey: #f3f3f3;
  --col-txt-prim: #ffffff;
  --col-txt-sec: #c0c0c0;
  --col-txt-dark: #444444;
}

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
