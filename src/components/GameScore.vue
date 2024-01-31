<template>
  <div class="game-score">Score: {{ score.pts }}</div>
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
  justify-content: center;
  gap: 0.6rem;

  font-size: 2rem;
  font-weight: 800;
  color: var(--col-food-apple);
}
</style>
