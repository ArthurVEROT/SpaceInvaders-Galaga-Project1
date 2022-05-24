class Spaceship {
  constructor(canvas, ctx, game) {
    this.game = game;
    this.canvas = canvas;
    this.ctx = ctx;
    this.image = new Image();
    this.width = 40;
    this.height = 40;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height - this.height - 10;
    this.spaceshipMoveSpeed = 2;
    this.bullets = [];
    this.ArrowRight = false;
    this.ArrowLeft = false;
    this.Space = false;
    this.init();
  }

  init() {
    this.image.src = "./images/spaceship.png";
    this.image.addEventListener("load", () => this.drawSpaceship());
  }
  drawSpaceship() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move() {
    if (this.ArrowLeft === true) {
      if (this.x < this.width / 2) return;
      this.x -= this.spaceshipMoveSpeed;
    }
    if (this.ArrowRight === true) {
      if (this.x > this.canvas.width - this.width * 1.5) return;
      this.x += this.spaceshipMoveSpeed;
    }
  }
  shoot() {
    if (this.Space === true) {
      const newBullet = new SpaceshipBullet(
        this.canvas,
        this.ctx,
        this.x + this.width / 2,
        this.y,
        this.game
      );
      this.bullets.push(newBullet);
    }
  }

  drawBullets() {
    if (!this.bullets.length > 0) {
      return;
    }
    this.bullets.forEach((bullet) => {
      bullet.draw();
    });
  }

  moveBullets() {
    if (!this.bullets.length > 0) {
      return;
    }
    this.bullets.forEach((bullet) => {
      bullet.move();
    });
  }

  checkCollisionWithAliens(aliens) {
    this.bullets.forEach((bullet, bulletIndex) => {
      bullet.checkCollisionWithAlien(aliens, bulletIndex);
    });
  }

  checkCollisionWithBullets(aliensBullets) {
    this.bullets.forEach((bullet, spaceshipBulletIndex) => {
      bullet.checkCollisionWithAliensBullets(
        aliensBullets,
        spaceshipBulletIndex
      );
    });
  }

  checkBoundariesForBullets() {
    this.bullets.forEach((bullet, bulletIndex) => {
      bullet.isSpaceshipBulletOutside(bulletIndex);
    });
  }

  removeSpaceshipBullet(bulletIndex) {
    this.bullets.splice(bulletIndex, 1);
  }
}
