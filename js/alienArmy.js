class AlienArmy {
  constructor(canvas, ctx, x, y, match) {
    this.match = match;
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = 7;
    this.height = 7;
    this.x = 1;
    this.y = 1;
    this.rowGap = 20;
    this.lineGap = 60;
    this.aliens = [];
    this.aliensBullets = [];
    this.armyMoveSpeed = 1;
    this.lastShot = Date.now();
    this.shotPace = 4000;
    this.init();
  }
  init() {
    this.makeAliens();
  }
  makeAliens() {
    const width = this.width + this.x;
    const height = this.height + this.y;
    const thisXTemps = this.x;
    const thisYTemps = this.y;

    for (; this.x < width; this.x++) {
      const row = [];
      console.log("make a row");
      console.log("this y", this.y);
      for (; this.y < height; this.y++) {
        console.log("make alien");
        const alien = new Alien(
          this.canvas,
          this.ctx,
          this.x * this.lineGap,
          this.y * this.rowGap,
          this.match
        );
        row.push(alien);
      }
      this.aliens.push(row);
      this.y = thisYTemps;
    }
    this.x = thisXTemps;
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
    if (this.aliens.length === 0) {
      this.match.hasWon();
    }
  }

  shoot() {
    // console.log('date.now()', Date.now());
    // console.log('this.lastshot', this.lastShot);
    // console.log(Date.now() - this.lastShot);
    // console.log('this shotpace', this.shotPace);
    if (Date.now() - this.lastshot < this.shotPace) {
      // console.log('has return');
      return;
    }
    // console.log('shot');
    this.aliens.forEach((row) => {
      row.forEach((alien) => {
        alien.shoot();
      });
    });
    this.lastshot = Date.now();
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

  move() {}
}
