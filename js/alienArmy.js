class AlienArmy {
  constructor(canvas, ctx, x, y, game) {
    this.game = game;
    this.canvas = canvas;
    this.ctx = ctx;
    // this.width = 20;
    // this.height = 20;
    this.x = x;
    this.y = y;
    this.aliens = [];
    this.aliensBullets = [];
    this.armyMoveSpeed = 1;
    this.init();
  }
  init() {
    this.makeAliens();
  }
  makeAliens() {
    for (let i = 1; i < 2; i++) {
      for (let j = 1; j < 2; j++) {
        const alien = new Alien(
          this.canvas,
          this.ctx,
          i * 60,
          j * 20,
          this.game
        );
        this.aliens.push(alien);
      }
    }
  }
  removeAlien(index) {
    this.aliens.splice(index, 1);
    if (this.aliens.length < 1) {
      this.game.hasWon();
    }
  }

  drawArmy() {
    if (this.aliens.length > 0) {
      this.aliens.forEach((alien) => {
        alien.draw();
      });
    }
  }

  shoot() {
    this.aliens.forEach((alien) => {
      alien.shoot();
    });
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

  move() {}
}
