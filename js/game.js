class Game {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.score = 0;
    this.highScore = 0;
    this.background = null;
    this.backgroundMoveSpeed = 1;
    this.spaceship = null;
    this.alienArmy = null;
    this.requestId = null;
    this.spaceshipShootingStart = null;
    this.aliensShootingStart = Date.now();
    this.moveStart = null;
    this.gameOn = false;
    this.lose = false;
    this.win = false;
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
    this.alienArmy = new AlienArmy(this.canvas, this.ctx, 100, 100, this);
    // this.alienArmy.makeAliens();

    this.runEveryFrame();
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

  trackScoreAndHighScore() {
    this.score += 1;
    if (this.highScore <= this.score) {
      this.highScore = this.score;
    }
  }

  drawScore() {
    this.ctx.font = "16px serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Score: ${this.score}`, 5, 20);
  }

  drawHighScore() {
    this.ctx.font = "16px serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      `High score: ${this.highScore}`,
      this.canvas.width - 100,
      20
    );
  }

  moveAll(currentTime) {
    this.background.move();
    this.alienArmy.moveBullets();
    if (this.spaceship) {
      this.spaceship.moveBullets();
      // Spaceship moving
      if (currentTime > this.moveStart + 10) {
        this.moveStart = Date.now();
        this.spaceship.move();
      }
    }
  }

  drawAll() {
    this.clear();
    this.background.draw();
    this.alienArmy.drawArmy();
    this.alienArmy.drawBullets();
    if (this.spaceship) {
      this.spaceship.drawSpaceship();
      this.spaceship.drawLives();
      this.spaceship.drawBullets();
    }
    this.drawScore();
    this.drawHighScore();
  }

  checkCollision() {
    if (this.spaceship) {
      // Collision between bullets
      this.spaceship.checkCollisionWithBullets(this.alienArmy.aliensBullets);

      // Collision between bullets and ships
      if (this.alienArmy.aliens.length > 0) {
        this.spaceship.checkCollisionWithAliens(this.alienArmy.aliens);
      }
      this.alienArmy.checkCollisionWithSpaceship(this.spaceship);
    }
  }

  checkBoundaries() {
    // Alien Army
    this.alienArmy.checkBoundariesForBullets();
    // Spaceship
    this.spaceship.checkBoundariesForBullets();
  }

  spaceshipShooting(currentTime) {
    // Spaceship
    if (this.spaceship) {
      // Spaceship Shooting
      if (currentTime > this.spaceshipShootingStart + 100) {
        this.spaceshipShootingStart = Date.now();
        this.spaceship.shoot();
      }
    }
  }

  aliensShooting(currentTime) {
    if (this.alienArmy.aliens.length > 0) {
      if (currentTime > this.aliensShootingStart + 5000) {
        this.aliensShootingStart = Date.now();
        this.alienArmy.shoot();
      }
    }
  }

  shooting(currentTime) {
    this.spaceshipShooting(currentTime);
    this.aliensShooting(currentTime);
  }

  runEveryFrame() {
    const currentTime = Date.now();
    this.drawAll();
    this.checkCollision();
    this.checkBoundaries();
    this.shooting(currentTime);
    this.moveAll(currentTime);
    this.requestId = window.requestAnimationFrame(() => {
      if (!this.lose && !this.win) {
        this.runEveryFrame();
      }
    });
  }

  removeSpaceship() {
    this.spaceship = null;
  }

  hasWon() {
    setTimeout(() => {
      this.win = true;
      this.drawEnd("win");
    }, 200);
  }
  hasLost() {
    this.lose = true;
    // this.requestId = null;
    this.drawEnd("lose");
  }

  drawEnd(result) {
    if (result === "lose") {
      this.ctx.fillRect(
        this.canvas.width / 5,
        this.canvas.height / 3,
        (this.canvas.width / 5) * 3,
        this.canvas.height / 3
      );
      // const myWidth = this.ctx.measureText("My text").width;

      this.ctx.testBaseline = "middle";
      this.ctx.font = "30px serif";
      this.ctx.fillStyle = "red";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        `You lost`,
        this.canvas.width / 2,
        this.canvas.height / 2
      );
      this.ctx.fillText(
        `Score: ${this.score}`,
        this.canvas.width / 2,
        this.canvas.height / 2 + 40
      );
    }
    if (result === "win") {
      this.ctx.fillRect(
        this.canvas.width / 5,
        this.canvas.height / 3,
        (this.canvas.width / 5) * 3,
        this.canvas.height / 3
      );
      // const myWidth = this.ctx.measureText("My text").width;

      this.ctx.testBaseline = "middle";
      this.ctx.font = "30px serif";
      this.ctx.fillStyle = "blue";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        `You Won`,
        this.canvas.width / 2,
        this.canvas.height / 2
      );
      this.ctx.fillText(
        `Score: ${this.score}`,
        this.canvas.width / 2,
        this.canvas.height / 2 + 40
      );
    }
  }
  stage() {}
}
