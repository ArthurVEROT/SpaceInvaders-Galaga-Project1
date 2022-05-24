class Game {
  constructor() {
    this.frameCount = 0;
    this.canvas = null;
    this.ctx = null;
    this.score = null;
    this.highScore = null;
    this.background = null;
    this.backgroundMoveSpeed = 1;
    this.spaceship = null;
    this.alienArmy = null;
    this.intervalId = null;
    this.gameOn = false;
    this.shootingStart = null;
    this.moveStart = null;
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
    this.loopTime = Date.now();
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
    this.alienArmy = new AlienArmy(this.canvas, this.ctx, 100, 100, this);
    this.alienArmy.makeAliens();
    this.alienArmy.shoot();

    this.drawAll();
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  createEventListeners() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowLeft") {
        this.spaceship.ArrowLeft = true;
        this.spaceship.move();
        this.moveStart = Date.now();
      }
      if (e.code === "ArrowRight") {
        this.spaceship.ArrowRight = true;
        this.spaceship.move();
        this.moveStart = Date.now();
      }
      if (e.code === "Space") {
        this.spaceship.Space = true;
        this.spaceship.shoot();
        this.shootingStart = Date.now();
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.code === "ArrowLeft") {
        this.spaceship.ArrowLeft = false;
        this.moveStart = null;
      }
      if (e.code === "ArrowRight") {
        this.spaceship.ArrowRight = false;
        this.moveStart = null;
      }
      if (e.code === "Space") {
        this.spaceship.Space = false;
        this.shootingStart = null;
      }
    });
  }

  trackScore() {
  }

  drawScore() {
    ctx.font = '48px serif';
    ctx.fillText('Score :', 10, 50);
  }

  trackHighScore() {

  }
  drawHighScore() {

  }

  moveAll() {
    this.background.move();
    this.alienArmy.moveBullets();
    if (this.spaceship) {
      this.spaceship.moveBullets();
    }
  }

  drawAll() {
    const currentTime = Date.now();
    this.clear();
    this.background.draw();

    // Alien Army
    this.alienArmy.drawArmy();
    this.alienArmy.drawBullets();
    this.alienArmy.checkBoundariesForBullets();

    // Spaceship
    if (this.spaceship) {
      this.spaceship.drawSpaceship();
      this.spaceship.drawBullets();
      this.spaceship.checkBoundariesForBullets();

      // Spaceship Shooting
      if (currentTime > this.shootingStart + 100) {
        this.shootingStart = Date.now();
        this.spaceship.shoot();
      }

      // Spaceship moving
      if (currentTime > this.moveStart + 10) {
        this.moveStart = Date.now();
        this.spaceship.move();
      }

      // Collision between bullets
      this.spaceship.checkCollisionWithBullets(this.alienArmy.aliensBullets);

      // Collision between bullets and ships
      if (this.alienArmy.aliens.length > 0) {
        this.spaceship.checkCollisionWithAliens(this.alienArmy.aliens);
      }
      this.alienArmy.checkCollisionWithSpaceship(this.spaceship);
      }

    // Move
    this.moveAll();

    this.intervalId = requestAnimationFrame(() => this.drawAll());
  }

  removeSpaceship() {
    this.spaceship = null;
  }

  win() {}
  lose() {}
  stage() {}
}
