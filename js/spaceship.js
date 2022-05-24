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
    this.spaceshipMoveSpeed = 3;
    this.lives = 2;
    this.bullets = [];
    this.ArrowRight = false;
    this.ArrowLeft = false;
    this.Space = false;
    this.init();
  }

  init() {
    this.image.src = "./images/spaceship.png";
    this.image.addEventListener("load", () => {
      this.draw();
      this.drawLives();
    });
  }
  draw() {
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
        this.match
      );
      this.bullets.push(newBullet);
    }
  }

  trackLives(action) {
    if (action === "lose") {
      this.lives -= 1;
      this.match.newRound = true;
    }
    if (action === "earn") {
      this.lives += 1;
    }
    if (this.lives === -1) {
      console.log(this.match.lose);
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
    if (!this.match.spaceship) {
      return;
    }
    this.bullets.forEach((bullet, bulletIndex) => {
      bullet.isSpaceshipBulletOutside(bulletIndex);
    });
  }

  removeSpaceshipBullet(bulletIndex) {
    this.bullets.splice(bulletIndex, 1);
  }

  clearAmmunition() {
    this.bullets = []
  }
}
