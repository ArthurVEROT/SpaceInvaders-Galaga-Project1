//
//
// Class Match is responsible for :
// - Construct the background, the spaceship, and the alien army.
// - It keeps track of the score, lose & win state.
// - It is also in charge of updating the canvas every frame.
//
//
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
    // this.matchOn = false;
    this.lose = false;
    this.win = false;
    this.newRound = false;
    this.stopAnimationFrame = false;

    this.soundEffectVolume = 0.2;

    this.pause = false;
    this.init();
  }

  init() {
    // this.matchOn = true;

    // I create the event listener for the pause/continue button
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

    //  When the game start, I play the background music,
    // I create the background, the spaceship and the army
    this.playBackgroundMusic();
    this.background = new Background(
      this.canvas,
      this.ctx,
      this.backgroundMoveSpeed
    );
    this.spaceship = new Spaceship(this.canvas, this.ctx, this);
    this.alienArmy = new AlienArmy(this.canvas, this.ctx, this);

    // I create the events listener for arrow keys
    // I start updating the canvas (moving, drawing, erasing)
    this.createEventListeners();
    this.updateCanvas();
  }

  pauseMatch() {
    this.pause = true;
    this.pauseBackgroundMusic();
  }

  continueMatch() {
    this.pause = false;
    this.playBackgroundMusic();
    this.updateCanvas();
  }

  createEventListeners() {
    //Event listener for Arrow Keys
    // When key down, I set the behavior on true
    //which will trigger this behavior later
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
    // I do the opposite on key up
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

  //
  //
  //
  //
  // Canvas updating
  //
  //
  //
  //

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

  shootAll() {
    if (this.spaceship) {
      this.spaceship.shoot();
    }
    if (this.alienArmy) {
      this.alienArmy.shoot();
    }
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

  ///////////////////////////////////////////// RUN EVERY FRAME /////////////////////////////////////////////
  updateCanvas() {
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
    if (this.win || this.lose || this.pause || this.stopAnimationFrame) {
      cancelAnimationFrame(this.requestId);
      return;
    }

    // Loop to run this method every frame
    this.requestId = window.requestAnimationFrame(() => {
      this.updateCanvas();
    });
  }

  //
  //
  //
  //
  //
  // Mehtods to feed to the "alls" methods above
  //
  //
  //
  //
  //

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
      this.updateCanvas();
    }, 500);
  }

  // We new round, we clear all the bullets on the screen
  clearBullets() {
    this.alienArmy.clearAmmunition();
    this.spaceship.clearAmmunition();
  }

  hasWon() {
    setTimeout(() => {
      this.win = true;
      this.resetBackgroundMusic();
      // this.stopAllSounds();
      this.displayResultMessage("win");
    }, 200);
  }
  hasLost() {
    this.lose = true;
    this.resetBackgroundMusic();
    // this.stopAllSounds();
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

  //
  //
  //
  // SOUNDS //
  //
  //
  //

  // Background music
  playBackgroundMusic() {
    backgroundMusic.play();
  }
  pauseBackgroundMusic() {
    backgroundMusic.pause();
  }
  resetBackgroundMusic() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  }

  // Others sounds
  playInvaderKilledSound() {
    invaderKilledSound.pause();
    invaderKilledSound.currentTime = 0;
    invaderKilledSound.volume = this.soundEffectVolume;
    invaderKilledSound.play();
  }
  playShootingSound() {
    shootingSound.pause();
    shootingSound.currentTime = 0;
    shootingSound.volume = this.soundEffectVolume;
    shootingSound.play();
  }
  playExplosionSound() {
    explosionSound.pause();
    explosionSound.volume = this.soundEffectVolume;
    explosionSound.play();
  }
  // stopAllSounds() {
  //   backgroundMusic.pause();
  // }
}
