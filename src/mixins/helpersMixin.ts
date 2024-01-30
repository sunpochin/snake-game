export default {
  methods: {
    randomOf(input) {
      return Math.floor(Math.random() * input);
    },
    isSnake(x, y) {
      return this.snake.some((segment) => segment.x === x && segment.y === y);
    },

    isFood(x, y) {
      return this.food.x === x && this.food.y === y;
    },

  },
};
