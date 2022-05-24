class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.match = null;
    this.highScore = 0;
    this.init();
  }
  init() {
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", () => {
      this.startMatch();
      startButton.textContent = "Restart";
      startButton.blur();
    });
  }

  startMatch() {
    if (this.match) {
      this.restartMatch();
      return
    }
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.match = new Match(this.canvas, this.ctx, this);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  restartMatch() {
    this.match.stopAnimationFrame = true;
    setTimeout(() => {
      this.clearCanvas();
      this.match = null;
      this.startMatch();
    }, 500);
  }

  trackHighScore() {
    if (this.highScore <= this.match.score) {
      this.highScore = this.score;
    }
  }
  stage() {}
}
