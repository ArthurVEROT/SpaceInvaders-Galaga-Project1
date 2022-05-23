class Game {
  constructor() {
    this.frameCount = 0;
    this.canvas = null;
    this.ctx = null;
    this.background = null;
    this.backgroundMoveSpeed = 1;
    this.spaceship = null;
    this.aliens = null;
    this.intervalId = null;
    this.gameOn = false
    this.init();
  }
  init() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    document.getElementById("start-button").addEventListener("click", () => {
      this.startGame();
    });
  }

  startGame() {
    if (this.gameOn === true) {return}

    this.gameOn = true
    this.createEventListeners();
    this.background = new Background(
      this.canvas,
      this.ctx,
      this.backgroundMoveSpeed
    );
    this.spaceship = new Spaceship(this.canvas, this.ctx);
    this.aliens = new Alien(this.canvas, this.ctx);
    
    this.drawAll();
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

  }
  createEventListeners() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowLeft") {
        this.spaceship.move("left");
      }
      if (e.code === "ArrowRight") {
        this.spaceship.move("right");
      }
    });
  }
  drawAll() {
    this.clear()
    this.background.draw()
    this.background.move()
    this.spaceship.draw()
    this.aliens.draw()

    this.intervalId = requestAnimationFrame(() => this.drawAll())
  }
  win() {}
  lose() {}
  stage() {}
}
