<template>
  <div class="game-board">
    <div
      v-for="(_, index) in Array(tileCount * tileCount)"
      class="tile"
      :class="getTileClass(index % tileCount, Math.floor(index / tileCount))"
      :key="index"
      @click="
        () => console.log(index % tileCount, Math.floor(index / tileCount))
      "
    ></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "GameBoard",
  props: {
    tileCount: {
      type: Number,
      required: true,
    },
    snake: {
      type: Object,
      required: true,
    },
    food: {
      type: Object,
      required: true,
    },
  },
  methods: {
    isSnake(x: number, y: number) {
      return this.snake.some(
        (segment: any) => segment.x === x && segment.y === y
      );
    },

    isFood(x: number, y: number) {
      return this.food.x === x && this.food.y === y;
    },

    getTileClass(x: number, y: number) {
      const head = this.snake[0];

      if (this.isSnake(x, y) && !(head.x === x && head.y === y)) {
        console.log("snake-body: ", x, y);
        return "snake-body";
      }

      if (head.x === x && head.y === y) {
        console.log("snake-head: ", x, y);
        return "snake-head";
      }

      return {
        "snake-head": head.x === x && head.y === y,
        "snake-body": this.isSnake(x, y) && !(head.x === x && head.y === y),
        food: this.isFood(x, y),
      };
    },
  },
};
</script>

<style>
.game-board {
  width: 60%;
  grid-column: 1 / -1;
  align-self: center;

  box-shadow: 0 0.5rem 2rem -1rem rgba(0, 0, 0, 0.8);
  border-radius: 1rem;

  display: grid;
  grid-template-columns: repeat(var(--tile-count), 1fr);
  align-content: start;

  gap: 0.2rem;
}
.tile {
  aspect-ratio: 1/1;
  background-color: #ffffff;
  border-radius: 0.25rem;
}
.snake-head {
  background-color: var(--col-sec);
}
.snake-body {
  background-color: var(--col-prim);
}
.food {
  background-color: var(--col-food-apple);
}
</style>
