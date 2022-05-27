//
// Class game is responsible for:
// - construct a match
// - Keep track of the high score between match
// - Get the Canvas and the context
//

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
    console.log('start');
    // if a match is already on, and someone click the start button, we run the restart method
    if (this.match) {
      this.restartMatch();
      return;
    }
    // If no match is on, we get the canvas, the context and create a new match
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.match = new Match(this.canvas, this.ctx, this);
  }

  restartMatch() {
    // If it is not a win or a lose, we stop the animation frame and reset music.
    // Because, after a win/lose, the music is stop, and when the player 
    //click on restart we don't want to stop it again.
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

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  trackHighScore() {
    if (this.highScore < this.match.score) {
      this.highScore = this.match.score;
    }
  }

  stage() {
    // TO DO
  }
}
