//
//
// Class Spaceship is responsible for :
// - construc the spaceship image
// - Specify its size and emplacement
// - spaceship move and shoot
// - track lives
//
//

class Spaceship {
  constructor(canvas, ctx, match) {
    this.match = match;
    this.canvas = canvas;
    this.ctx = ctx;
    this.image = new Image();
    this.width = 40;
    this.height = 40;
    this.x = this.canvas.width / 2 - this.width / 2;
    this.y = this.canvas.height - this.height - 20;
    this.spaceshipSpeed = 3;
    this.lives = 2;
    this.bullets = [];
    this.ArrowRight = false;
    this.ArrowLeft = false;
    this.ArrowUp = false;
    this.ArrowDown = false;
    this.Space = false;
    this.shotPace = 200;
    this.lastshot = Date.now();
    this.explosionImage = new Image();
    this.init();
  }

  init() {
    this.image.src = "./images/spaceship.png";
    this.explosionImage.src = "./images/explosion.png";
    this.image.addEventListener("load", () => {
      this.draw();
      this.drawLives();
    });
  }

  drawAll() {
    this.draw();
    this.drawBullets();
    this.drawLives();
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move() {
    if (this.ArrowLeft) {
      if (this.x < this.width / 2) return;
      this.x -= this.spaceshipSpeed;
    }
    if (this.ArrowRight) {
      if (this.x > this.canvas.width - this.width * 1.25) return;
      this.x += this.spaceshipSpeed;
    }
    if (this.ArrowUp) {
      if (this.y < 0) return;
      this.y -= this.spaceshipSpeed;
    }
    if (this.ArrowDown) {
      if (this.y + this.height > this.canvas.height - 20) return;
      this.y += this.spaceshipSpeed;
    }
  }
  shoot() {
    if (!this.Space) {
      return;
    }
    if (Date.now() - this.lastshot < this.shotPace) {
      return;
    }
    const newBullet = new SpaceshipBullet(
      this.canvas,
      this.ctx,
      this.x + this.width / 2,
      this.y,
      this.match
    );
    this.bullets.push(newBullet);
    this.lastshot = Date.now();
    this.match.playShootingSound();
  }

  //
  // Lives
  //
  trackLives(action) {
    if (action === "lose") {
      this.lives -= 1;
      this.drawExplosion();
      this.match.playExplosionSound();
      this.match.newRound = true;
    }
    if (action === "earn") {
      this.lives += 1;
    }
    if (this.lives === -1) {
      this.match.hasLost();
    }
  }
  drawLives() {
    for (let i = 0; i < this.lives; i++) {
      this.ctx.drawImage(
        this.image,
        5 + i * (this.width * 0.5),
        this.canvas.height - 20,
        this.width * 0.5,
        this.height * 0.5
      );
    }
  }

  //
  // Bullets
  //

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

  //
  // Collision
  //
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
    if (!this.match.spaceship) {
      return;
    }
    this.bullets.forEach((bullet, bulletIndex) => {
      bullet.isSpaceshipBulletOutside(bulletIndex);
    });
  }

  //
  // Others
  //
  removeSpaceshipBullet(bulletIndex) {
    this.bullets.splice(bulletIndex, 1);
  }

  clearAmmunition() {
    this.bullets = [];
  }

  spaceShipToInitialPosition() {
    this.x = this.canvas.width / 2 - this.width / 2;
    this.y = this.canvas.height - this.height - 20;
  }

  drawExplosion() {
    this.ctx.drawImage(
      this.explosionImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
