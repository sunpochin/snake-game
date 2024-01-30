<template>
  <div class="game-logo">
    <div class="game-logo-text">
      <h1 class="game-logo-title">Snake</h1>
      <h2 class="game-logo-subtitle">Eat apples!</h2>
    </div>
    <div class="game-over">
      <h1>Game Over</h1>
    </div>

    <div class="game-gui">
      <div class="game-ctrl">
        <button class="btn btn-start" @click="startGame">Start</button>
        <GameScore :score="score" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import GameScore from "./GameScore.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameHeader",
  components: {
    GameScore,
  },
  props: {
    score: {
      id: Number,
      pts: Number,
      required: true,
    },
    startGame: Function,
  },
});
</script>

<style>
.game-logo {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.game-logo-img {
  display: block;
  width: 6rem;
}
.game-logo-text {
  max-width: 100%;
  line-height: 1.2;
  display: flex;
  flex-direction: row;
  /* align-items: space-around; */
  justify-content: center;
}
.game-logo-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--col-prim);
}
.game-logo-subtitle {
  font-size: 3rem;
  font-weight: 800;
  color: var(--col-food-apple);
}

.game-gui {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.game-ctrl {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.game-btn-wrapper {
  display: flex;
  gap: 1rem;
}

/* Buttons */
.btn {
  background-color: var(--col-prim);
  border: 0;
  border-bottom: 0.5rem solid var(--col-sec);
  border-radius: 1rem;
  color: white;
}
.btn:focus-visible {
  outline: 0.25rem dashed var(--col-prim);
  outline-offset: 0.25rem;
}
.btn:active {
  border-bottom: 0.25rem solid var(--col-sec);
}
.btn-start {
  padding: 1rem 2rem;

  font-size: 1.6rem;
  font-weight: 600;
  text-transform: uppercase;
}
.btn-ctrl {
  width: 100%;
  padding: 1rem;
}
</style>
