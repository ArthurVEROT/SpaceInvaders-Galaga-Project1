class AlienArmy {
  constructor(canvas, ctx, x, y, match) {
    this.match = match;
    this.canvas = canvas;
    this.ctx = ctx;

    this.x = null;
    this.y = 20;

    this.rowNumber = 6;
    this.colNumber = 6;

    this.rowGap = 10;
    this.colGap = 55;

    this.width = null;
    this.height = null;

    this.alien = new Alien(
      this.canvas,
      this.ctx,
      this.x * this.colGap,
      this.y * this.rowGap,
      this.match
    );
    this.aliens = [];
    this.aliensBullets = [];
    this.armyMoveSpeed = 1;
    this.lastShot = Date.now();
    this.shotPace = 4000;

    this.lastMove = Date.now();
    this.movePace = 250;
    this.moveSpeed = 10;
    this.moveDirection = "right";
    this.init();
  }
  init() {
    this.makeAliens();
  }

  centerTheArmy() {
    this.width =
      this.alien.width * this.colNumber + this.colGap * (this.colNumber - 1);
    this.height =
      this.alien.height * this.rowNumber + this.rowGap * (this.rowNumber - 1);
    this.x = (this.canvas.width - this.width) / 2;
  }
  makeAliens() {
    this.centerTheArmy();
    const thisXTemp = this.x;
    const thisYTemp = this.y;
    const xIncrement = this.colGap + this.alien.width;
    const yIncrement = this.rowGap + this.alien.height;
    const xMax = this.width + thisXTemp;
    const yMax = this.height + thisYTemp;

    for (; this.y < yMax; this.y = this.y + yIncrement) {
      const row = [];
      for (; this.x < xMax; this.x = this.x + xIncrement) {
        const alien = new Alien(
          this.canvas,
          this.ctx,
          this.x,
          this.y,
          this.match
        );
        row.push(alien);
      }
      this.aliens.push(row);
      this.x = thisXTemp;
    }
    this.y = thisYTemp;
  }

  drawArmy() {
    if (this.aliens.length > 0) {
      this.aliens.forEach((row) => {
        row.forEach((alien) => {
          alien.draw();
        });
      });
    }
  }

  removeAlien(rowIndex, index) {
    this.aliens[rowIndex].splice(index, 1);

    let flatAleins = this.aliens.flat();
    if (flatAleins.length === 0) {
      this.match.hasWon();
    }
  }

  shoot() {
    if (Date.now() - this.lastShot < this.shotPace) {
      return;
    }
    this.aliens.forEach((row) => {
      row.forEach((alien) => {
        alien.shoot();
      });
    });
    this.lastShot = Date.now();
  }

  drawBullets() {
    if (!this.aliensBullets.length > 0) {
      return;
    }
    this.aliensBullets.forEach((bullet) => {
      bullet.draw();
    });
  }

  moveBullets() {
    if (!this.aliensBullets.length > 0) {
      return;
    }
    this.aliensBullets.forEach((bullet) => {
      bullet.move();
    });
  }

  checkCollisionWithSpaceship(spaceship) {
    this.aliensBullets.forEach((bullet, bulletIndex) => {
      bullet.checkCollisionWithSpaceship(spaceship, bulletIndex);
    });
  }

  checkBoundariesForBullets() {
    this.aliensBullets.forEach((bullet, bulletIndex) => {
      bullet.isAlienBulletOutside(bulletIndex);
    });
  }

  removeAlienBullet(bulletIndex) {
    this.aliensBullets.splice(bulletIndex, 1);
  }

  clearAmmunition() {
    this.aliensBullets = [];
  }

  sideMove() {
    // Do we move
    if (Date.now() - this.lastMove < this.movePace) {
      return;
    }
    this.checkArmyColision();
    // Move right
    if (this.moveDirection === "right") {
      this.aliens.forEach((row) => {
        row.forEach((alien) => {
          alien.x += this.moveSpeed;
        });
      });
      this.lastMove = Date.now();
    }

    // Move left
    if (this.moveDirection === "left") {
      this.aliens.forEach((row) => {
        row.forEach((alien) => {
          alien.x -= this.moveSpeed;
        });
      });
      this.lastMove = Date.now();
    }
  }

  downMove() {
    this.aliens.forEach((row) => {
      row.forEach((alien) => {
        alien.y += this.moveSpeed;
      });
    });
  }

  checkArmyColision() {
    if (this.aliens[0][0].x > this.canvas.width - this.width) {
      this.moveDirection = "left";
      this.downMove();
    }
    // Move right
    if (this.aliens[0][0].x < 10) {
      this.moveDirection = "right";
      this.downMove();
    }
  }
}
