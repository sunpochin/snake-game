<template>
  <div class="game-logo">
    <div class="game-logo-text">
      <h1 class="game-logo-title">Snake</h1>
      <h2 class="game-logo-subtitle">Eat apples!</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GameHeader",
});
</script>

<style>
.game-logo {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.game-logo-img {
  display: block;
  width: 6rem;
}
.game-logo-text {
  line-height: 1.2;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.game-logo-title {
  font-size: 3rem;
  font-weight: 800;
  color: var(--col-prim);
}
.game-logo-subtitle {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--col-txt-sec);
}
</style>
