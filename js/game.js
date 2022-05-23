class Game {
  constructor() {
    this.frameCount = 0;
    this.canvas = null;
    this.ctx = null;
    this.background = null;
    this.backgroundMoveSpeed = 1;
    this.spaceship = null;
    this.aliens = [];
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
    this.makeAlien()

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

  makeAlien() {
    for (let i = 1; i < 8; i++) {
      for (let j = 1; j < 8; j++) {
        const alien = new Alien (this.canvas, this.ctx, i*40, j*20)
        this.aliens.push(alien)
      }
    }
  }

  removeAlien(index) {
    this.aliens.splice(index, 1)
  }

  moveAll() {
    this.background.move();
    if (this.spaceship.bullets) {
      this.spaceship.bullets.forEach((bullet) => {
        bullet.move();
      });
    }
  }

  drawAll() {
    this.clear();
    this.background.draw();
    this.spaceship.draw();

    if (this.aliens.length > 0) {
      this.aliens.forEach(alien => {
        alien.draw()
      });
      // this.spaceship.removeBullet(this.aliens);
      this.spaceship.checkCollisionOnEachBullets(this.aliens);
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
