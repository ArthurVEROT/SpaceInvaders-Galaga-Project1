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
    // this.backgroundMusic = new Audio("./sounds/spaceinvaders1.mpeg");
    this.invaderKilledSound = new Audio("./sounds/invaderKilled.wav");
    this.shootingSound = new Audio("./sounds/shoot.wav");
    this.explosionSound = new Audio("./sounds/explosion.wav");

    this.pause = false;
    this.init();
  }

  init() {
    this.matchOn = true;
    pauseButton.addEventListener("click", () => {
      if (this.pause) {
        this.continueMatch();
        pauseButton.textContent = "Pause";
        pauseButton.blur();
      } else {
        this.pauseMatch();
        pauseButton.textContent = "Continue";
        pauseButton.blur();
      }
    });

    this.playBackgroundMusic();
    this.background = new Background(
      this.canvas,
      this.ctx,
      this.backgroundMoveSpeed
    );
    this.spaceship = new Spaceship(this.canvas, this.ctx, this);
    this.alienArmy = new AlienArmy(this.canvas, this.ctx, this);
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

  pauseMatch() {
    this.pause = true;
    this.pauseBackgroundMusic();
  }

  continueMatch() {
    this.pause = false;
    this.playBackgroundMusic();
    this.runEveryFrame();
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
      this.spaceship.drawAll();
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
    this.drawAll();
    this.checkCollision();
    this.checkBoundaries();
    this.moveAll();
    this.shootAll();

    if (this.newRound) {
      cancelAnimationFrame(this.requestId);
      this.startNewRound();
      return;
    }
    if (this.win || this.lose || this.pause) {
      cancelAnimationFrame(this.requestId);
      return;
    }
    if (this.stopAnimationFrame) {
      cancelAnimationFrame(this.requestId);
      return;
    }

    this.requestId = window.requestAnimationFrame(() => {
      this.runEveryFrame();
    });
  }

  trackScore() {
    this.score += 1;
  }

  drawScore() {
    this.ctx.font = "1rem serious1, sans-serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Score: ${this.score}`, 5, 20);
  }

  drawHighScore() {
    this.ctx.font = "1rem serious1, sans-serif";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      `High score: ${this.game.highScore}`,
      this.canvas.width - 145,
      20
    );
  }

  // When your spaceship is hit by a bullet, it freeze, all the bullets disappear and you lose a life
  startNewRound() {
    this.newRound = false;
    this.clearBullets();
    this.spaceship.spaceShipToInitialPosition();
    setTimeout(() => {
      this.runEveryFrame();
    }, 500);
  }

  hasWon() {
    setTimeout(() => {
      this.win = true;
      this.stopAllSounds();
      this.displayResultMessage("win");
    }, 200);
  }
  hasLost() {
    this.lose = true;
    this.stopAllSounds();
    this.displayResultMessage("lose");
  }

  displayResultMessage(result) {
    if (result === "win") {
      winMessage.style.display = "flex";
    }
    if (result === "lose") {
      loseMessage.style.display = "flex";
    }
  }

  clearBullets() {
    this.alienArmy.clearAmmunition();
    this.spaceship.clearAmmunition();
  }

  reset() {
    this.resetBackgroundMusic();
  }

  ///////// SOUNDS ///////////
  playBackgroundMusic() {
    // this.backgroundMusic.play();
    backgroundMusic.play();
  }
  pauseBackgroundMusic() {
    backgroundMusic.pause();
    // this.backgroundMusic.pause();
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
    backgroundMusic.pause();
    // this.backgroundMusic.pause();
  }

  resetBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    // this.backgroundMusic.pause();
    // this.backgroundMusic.currentTime = 0;
  }
}
