<template>
  <div class="game-logo-text">
    <p class="game-logo-title">Snake</p>
    <!-- <p class="game-logo-subtitle">Eat apples!</p> -->
  </div>
  <hr />
  <br />
  <div class="game-status">
    <div v-if="!isRunning" class="game-over">
      <h3>Game Over. Press</h3>
    </div>

    <div>
      <div v-if="!isRunning" class="game-gui game-ctrl">
        <button class="btn btn-start" @click="startGame">Start</button>
      </div>
    </div>
    <h2 v-if="isRunning">GO eat food!</h2>
  </div>
  <GameScore :score="score" />
</template>

<script>
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
    isRunning: {
      type: Boolean,
      required: true,
    },
    startGame: Function,
  },
});
</script>

<style>
.game-logo-text {
  max-width: 100%;
  line-height: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2rem;
}
.game-logo-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--col-prim);
}
/* .game-logo-subtitle {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--col-food-apple);
} */

.game-status {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  font-size: 2rem;
}

.game-gui {
  display: flex;
  align-items: center;
  justify-content: space-between;

  display: inline-block;
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
