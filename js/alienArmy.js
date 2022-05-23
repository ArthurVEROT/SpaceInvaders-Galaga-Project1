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
  }
  makeAlien() {
    for (let i = 1; i < 8; i++) {
      for (let j = 1; j < 8; j++) {
        const alien = new Alien(
          this.canvas,
          this.ctx,
          i * 40,
          j * 20,
          this.game
        );
        this.aliens.push(alien);
      }
    }
  }
  removeAlien(index) {
    this.aliens.splice(index, 1);
  }

  drawArmy() {
    if (this.aliens.length > 0) {
      this.aliens.forEach((alien) => {
        alien.draw();
      });
    }
  }

  shoot() {
    setInterval(() => {
      this.aliens.forEach((alien) => {
        alien.shoot();
      });
    }, 5000);
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

  checkCollisionOnEachBullets(spaceship) {
    this.aliensBullets.forEach((bullet, bulletIndex) => {
      bullet.checkCollisionWithSpaceship(spaceship, bulletIndex);
    });
  }

  removeAlienBullet(bulletIndex) {
    console.log("bulletIndex", bulletIndex);
    this.aliensBullets.splice(bulletIndex, 1);
  }

  move() {}
}
