<template>
  <div class="game-score">
    <h1>Score: {{ score.pts }}</h1>
  </div>
</template>

<script>
export default {
  name: "GameScore",
  props: {
    score: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.game-score {
  display: flex;
  align-items: center;
  gap: 0.6rem;

  font-size: 1.6rem;
  font-weight: 800;
  color: var(--col-food-apple);
}
</style>
