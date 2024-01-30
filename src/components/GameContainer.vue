<template>
  <div>
    <div class="game-container" :style="`--tile-count: ${tileCount};`">
      <GameHeader />

      <div class="game-gui">
        <div class="game-ctrl">
          <button class="btn btn-start" @click="startGame">Start</button>
        </div>
      </div>

      <GameBoard :tileCount="tileCount" :snake="snake" :food="food" />
    </div>
  </div>
</template>

<script lang="ts">
import GameBoard from "./GameBoard.vue";
import GameHeader from "./GameHeader.vue";
import helpersMixin from "../mixins/helpersMixin";

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
      tileCount: 20,

      snake: [
        {
          x: Math.floor(this.tileCount / 2),
          y: Math.floor(this.tileCount / 2),
        },
      ],
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

    changeDirection(newDirection: string) {
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

    gameLoop() {
      if (!this.isRunning) return;
      const newHead = this.getNewHead();
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
      } else {
        // Remove snake tail.
        this.snake.pop();
      }
      setTimeout(this.gameLoop, 120);
    },

    getNewHead() {
      const head = this.snake[0];
      let newHead = { x: 0, y: 0 };

      switch (this.direction) {
        case "right":
          newHead = { x: (head.x + 1) % this.tileCount, y: head.y };
          break;
        case "left":
          newHead = {
            x: (head.x - 1 + this.tileCount) % this.tileCount,
            y: head.y,
          };
          break;
        case "up":
          newHead = {
            x: head.x,
            y: (head.y - 1 + this.tileCount) % this.tileCount,
          };
          break;
        case "down":
          newHead = { x: head.x, y: (head.y + 1) % this.tileCount };
          break;
      }

      return newHead;
    },

    handleKeydown(e: KeyboardEvent) {
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
  margin: auto;
  padding: 2rem;
  max-width: 70rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.game-container > * {
  min-width: 0;
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
