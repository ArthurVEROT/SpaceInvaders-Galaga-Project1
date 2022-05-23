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
    this.gameOn = false;
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
    if (this.gameOn === true) {
      return;
    }
    this.gameOn = true;
    this.createEventListeners();
    this.background = new Background(
      this.canvas,
      this.ctx,
      this.backgroundMoveSpeed
    );
    this.spaceship = new Spaceship(this.canvas, this.ctx, this);
    this.aliens = new Alien(this.canvas, this.ctx);

    this.drawAll();
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  createEventListeners() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowLeft") {
        this.spaceship.move("left");
      }
      if (e.code === "ArrowRight") {
        this.spaceship.move("right");
      }
      if (e.code === "Space") {
        this.spaceship.shoot();
      }
    });
  }

  moveAll() {
    this.background.move();
    if (this.spaceship.bullets) {
      this.spaceship.bullets.forEach((bullet) => {
        bullet.move();
      });
    }
  }

  withdrawShotAlien() {
        this.aliens = null;
  }

  drawAll() {
    this.clear();
    this.background.draw();
    this.spaceship.draw();

    if (this.aliens) {
      this.aliens.draw();
      this.spaceship.withdrawCollidedBullets(this.aliens);
    }

    if (this.spaceship.bullets.length > 0) {
      this.spaceship.bullets.forEach((bullet) => {
        bullet.draw();
      });
    }
    this.moveAll();

    

    this.intervalId = requestAnimationFrame(() => this.drawAll());
  }

  win() {}
  lose() {}
  stage() {}
}
