class Match {
  constructor(canvas, ctx, game) {
    this.game = game;
    this.canvas = canvas;
    this.ctx = ctx;
    this.background = null;
    this.backgroundMoveSpeed = 1;
    this.spaceship = null;
    this.alienArmy = null;
    this.score = 0;

    this.requestId = null;
    this.matchOn = false;
    this.lose = false;
    this.win = false;
    this.newRound = false;
    this.stopAnimationFrame = false;

    this.soundEffectVolume = 0.2;
    this.backgroundMusic = new Audio("./sounds/spaceinvaders1.mpeg");
    this.invaderKilledSound = new Audio("./sounds/invaderKilled.wav");
    this.shootingSound = new Audio("./sounds/shoot.wav");
    this.explosionSound = new Audio("./sounds/explosion.wav");
    this.init();
  }

  init() {
    this.matchOn = true;
    this.playBackgroundMusic();
    this.background = new Background(
      this.canvas,
      this.ctx,
      this.backgroundMoveSpeed
    );
    this.spaceship = new Spaceship(this.canvas, this.ctx, this);
    this.alienArmy = new AlienArmy(this.canvas, this.ctx, 100, 100, this);
    this.createEventListeners();

    this.runEveryFrame();
  }

  createEventListeners() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowLeft") {
        this.spaceship.ArrowLeft = true;
      }
      if (e.code === "ArrowRight") {
        this.spaceship.ArrowRight = true;
      }
      if (e.code === "ArrowUp") {
        this.spaceship.ArrowUp = true;
      }
      if (e.code === "ArrowDown") {
        this.spaceship.ArrowDown = true;
      }

      if (e.code === "Space") {
        this.spaceship.Space = true;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.code === "ArrowLeft") {
        this.spaceship.ArrowLeft = false;
      }
      if (e.code === "ArrowRight") {
        this.spaceship.ArrowRight = false;
      }
      if (e.code === "ArrowUp") {
        this.spaceship.ArrowUp = false;
      }
      if (e.code === "ArrowDown") {
        this.spaceship.ArrowDown = false;
      }
      if (e.code === "Space") {
        this.spaceship.Space = false;
      }
    });
  }

  moveAll() {
    this.background.move();
    this.alienArmy.moveBullets();
    this.alienArmy.sideMove();
    if (!this.spaceship) {
      return;
    }
    this.spaceship.moveBullets();
    this.spaceship.move();
  }

  drawAll() {
    this.game.clearCanvas();
    this.background.draw();
    this.alienArmy.drawArmy();
    this.alienArmy.drawBullets();
    if (this.spaceship) {
      this.spaceship.draw();
      this.spaceship.drawLives();
      this.spaceship.drawBullets();
    }
    this.drawScore();
    this.drawHighScore();
  }

  checkCollision() {
    if (!this.spaceship) {
      return;
    }
    // Collision between bullets
    this.spaceship.checkCollisionWithBullets(this.alienArmy.aliensBullets);

    // Collision between bullets and ships
    if (this.alienArmy.aliens.length > 0) {
      this.spaceship.checkCollisionWithAliens(this.alienArmy.aliens);
    }
    this.alienArmy.checkBulletCollisionWithSpaceship(this.spaceship);
    this.alienArmy.checkCollisionWithSpaceship(this.spaceship);
  }

  checkBoundaries() {
    // Alien Army
    this.alienArmy.checkBoundariesForBullets();
    // Spaceship
    this.spaceship.checkBoundariesForBullets();
  }

  shootAll() {
    if (this.spaceship) {
      this.spaceship.shoot();
    }
    if (this.alienArmy) {
      this.alienArmy.shoot();
    }
  }

  ///////// RUN EVERY FRAME //////////
  runEveryFrame() {
    if (this.lose || this.win) {
      cancelAnimationFrame(this.requestId);
      return;
    }
    if (this.newRound) {
      cancelAnimationFrame(this.requestId);
      this.startNewRound();
      return;
    }
    if (this.stopAnimationFrame) {
      cancelAnimationFrame(this.requestId);
      return;
    }

    this.drawAll();
    this.checkCollision();
    this.checkBoundaries();
    this.moveAll();
    this.shootAll();
    this.requestId = window.requestAnimationFrame(() => {
      this.runEveryFrame();
    });
  }

  trackScore() {
    this.score += 1;
  }

  drawScore() {
    this.ctx.font = "16px sansserif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Score: ${this.score}`, 5, 20);
  }

  drawHighScore() {
    this.ctx.font = "16px sansserif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      `High score: ${this.game.highScore}`,
      this.canvas.width - 100,
      20
    );
  }

  // When your spaceship is hit by a bullet, it freeze, all the bullets disappear and you lose a life
  startNewRound() {
    this.newRound = false;
    setTimeout(() => {
      this.clearBullets();
      this.runEveryFrame();
    }, 500);
  }

  hasWon() {
    setTimeout(() => {
      this.win = true;
      this.drawEnd("win");
      this.stopAllSounds();
    }, 200);
  }
  hasLost() {
    this.lose = true;
    // this.requestId = null;
    this.drawEnd("lose");
  }

  drawEnd(result) {
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

    if (result === "lose") {
      this.ctx.fillText(
        `You lost`,
        this.canvas.width / 2,
        this.canvas.height / 2
      );
    }
    if (result === "win") {
      this.ctx.fillText(
        `You win`,
        this.canvas.width / 2,
        this.canvas.height / 2
      );
    }
    this.ctx.fillText(
      `Score: ${this.score}`,
      this.canvas.width / 2,
      this.canvas.height / 2 + 40
    );
  }

  clearBullets() {
    this.alienArmy.clearAmmunition();
    this.spaceship.clearAmmunition();
  }

  ///////// SOUNDS ///////////
  playBackgroundMusic() {
    this.backgroundMusic.play();
  }

  playInvaderKilledSound() {
    this.invaderKilledSound.pause();
    this.invaderKilledSound.currentTime = 0;
    this.invaderKilledSound.volume = this.soundEffectVolume;
    this.invaderKilledSound.play();
  }
  playShootingSound() {
    this.shootingSound.pause();
    this.shootingSound.currentTime = 0;
    this.shootingSound.volume = this.soundEffectVolume;
    this.shootingSound.play();
  }
  playExplosionSound() {
    this.explosionSound.pause();
    this.explosionSound.volume = this.soundEffectVolume;
    this.explosionSound.play();
  }

  stopAllSounds() {
    this.backgroundMusic.pause();
  }
}
