<template>
  <div>
    <div class="game-container" :style="`--tile-count: ${tileCount};`">
      <div>
        <GameHeader
          :score="score"
          :startGame="this.startGame"
          :isRunning="isRunning"
        />
      </div>
      <GameBoard :tileCount="tileCount" :snake="snake" :food="food" />
    </div>
  </div>
  <div class="mobile-play">
    <button class="arrow" @click="arrowUp">
      &nbsp;&nbsp;&nbsp;UP&nbsp;&nbsp;&nbsp;
    </button>
    <br />
    <br />
    <div class="left-right">
      <button class="arrow" @click="arrowLeft">LEFT</button>
      <button class="arrow" @click="arrowRight">RIGHT</button>
    </div>
    <br />
    <button class="arrow" @click="arrowDown">DOWN</button>
  </div>
</template>

<script>
import GameBoard from "./GameBoard.vue";
import GameHeader from "./GameHeader.vue";
import helpersMixin from "../mixins/helpersMixin";

const tileCounts = 20;

export default {
  title: "Snake Game",
  mixins: [helpersMixin],
  components: {
    GameBoard,
    GameHeader,
  },
  data() {
    return {
      directions: ["up", "down", "left", "right"],
      tileCount: tileCounts,
      // Snake is an array of objects. Each object has x and y properties.
      // Snake head is the first element of the array. Snake tail is the last element of the array.
      snake: [
        {
          x: Math.floor(this.tileCount / 2),
          y: Math.floor(this.tileCount / 2),
        },
      ],
      // Food is an object with x and y properties.
      food: {
        x: this.randomOf(this.tileCount),
        y: this.randomOf(this.tileCount),
      },

      isRunning: false,
      direction: "right",
      score: { id: null, pts: 0 },
      highscores: [],
      lastPlayedScore: null,
    };
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
  },
  methods: {
    arrowUp() {
      this.changeDirection("up");
    },
    arrowDown() {
      this.changeDirection("down");
    },
    arrowLeft() {
      this.changeDirection("left");
    },
    arrowRight() {
      this.changeDirection("right");
    },
    startGame() {
      this.resetGame();
      if (!this.isRunning) {
        this.isRunning = true;
        this.gameLoop();
      }
    },

    resetGame() {
      this.score.pts = 0;
      this.snake = [
        {
          x: Math.floor(this.tileCount / 2),
          y: Math.floor(this.tileCount / 2),
        },
      ];
      this.direction = this.directions[this.randomOf(this.directions.length)];
      this.food = {
        x: this.randomOf(this.tileCount),
        y: this.randomOf(this.tileCount),
      };
    },

    changeDirection(newDirection) {
      if (!this.isRunning) return;

      switch (this.direction) {
        case "up":
          if (newDirection === "down") return;
          this.direction = newDirection;
          break;
        case "down":
          if (newDirection === "up") return;
          this.direction = newDirection;
          break;
        case "left":
          if (newDirection === "right") return;
          this.direction = newDirection;
          break;
        case "right":
          if (newDirection === "left") return;
          this.direction = newDirection;
          break;
      }
    },

    isSnakeOutside() {
      const head = this.snake[0];
      return (
        head.x < 0 ||
        head.x >= this.tileCount ||
        head.y < 0 ||
        head.y >= this.tileCount
      );
    },

    gameLoop() {
      if (!this.isRunning) return;

      // End game if snake head hits snake body.
      const newHead = this.getNewHead();
      if (this.isSnakeOutside()) {
        this.isRunning = false;
        return;
      }
      if (this.isSnake(newHead.x, newHead.y)) {
        this.isRunning = false;
        return;
      }
      // Snake head move forward.
      this.snake.unshift(newHead);
      if (this.isFood(newHead.x, newHead.y)) {
        // Snake eats food, tail don't remove.
        this.food = {
          x: this.randomOf(this.tileCount),
          y: this.randomOf(this.tileCount),
        };
        this.score.id = Date.now();
        this.score.pts += 1;
      } else {
        // Remove snake tail.
        this.snake.pop();
      }
      setTimeout(this.gameLoop, 180);
    },

    getNewHead() {
      const head = this.snake[0];
      let newHead = { x: -1, y: -1 };
      switch (this.direction) {
        case "right":
          newHead = { x: head.x + 1, y: head.y };
          break;
        case "left":
          newHead = {
            x: head.x - 1,
            y: head.y,
          };
          break;
        case "up":
          newHead = {
            x: head.x,
            y: head.y - 1,
          };
          break;
        case "down":
          newHead = { x: head.x, y: head.y + 1 };
          break;
      }
      return newHead;
    },

    handleKeydown(e) {
      if (e.key === "ArrowUp") {
        this.changeDirection("up");
      } else if (e.key === "ArrowDown") {
        this.changeDirection("down");
      } else if (e.key === "ArrowLeft") {
        this.changeDirection("left");
      } else if (e.key === "ArrowRight") {
        this.changeDirection("right");
      }
    },
  },
};
</script>

<style scoped>
/* Layout */
.game-container {
  padding: 0.5rem;
  max-width: 70rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-height: 100vh;
}
.game-container > * {
  min-width: 0;
}

.left-right {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
}

.arrow {
  width: 12rem;
  height: 6rem;
}

.mobile-play {
  display: none;
}

/* Media queries */
@media (max-width: 380px) {
  .mobile-play {
    display: block;
  }
  .game-container {
    max-height: 70vh;
  }
}
</style>
