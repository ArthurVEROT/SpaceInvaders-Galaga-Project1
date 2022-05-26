class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.match = null;
    this.highScore = 0;
    this.init();
  }
  init() {
    startButton.addEventListener("click", () => {
      this.startMatch();
      startButton.textContent = "Restart";
      startButton.blur();
    });
  }

  startMatch() {
    if (this.match) {
      this.restartMatch();
      return;
    }
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.match = new Match(this.canvas, this.ctx, this);
    console.log("this.canvas.width", this.canvas.width);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  restartMatch() {
    if (!this.match.win && !this.match.lose) {
      this.match.stopAnimationFrame = true;
      this.match.resetBackgroundMusic();
    }
    if (this.match.win || this.match.lose) {
      winMessage.style.display = "none";
      loseMessage.style.display = "none";
    }
    this.clearCanvas();
    this.ctx = null;
    this.canvas = null;
    this.match = null;
    this.startMatch();
  }

  trackHighScore() {
    if (this.highScore < this.match.score) {
      this.highScore = this.match.score;
    }
  }

  stage() {}
}
