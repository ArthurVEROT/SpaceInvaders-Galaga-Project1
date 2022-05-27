class Bullet {
  constructor(canvas, ctx, x, y, match) {
    this.match = match;
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = 5;
    this.height = 10;
    this.x = x;
    this.y = y;
  }

  isBulletOutside() {
    if (this.x > this.canvas.width) {
      return true;
    }
    if (this.y > this.canvas.height) {
      return true;
    }
    if (this.y < 0) {
      return true;
    }
    if (this.x < 0) {
      return true;
    }
    return false;
  }
}
//
//
//
//////// SPACESHIP BULLET ////////////
//
//
//
//
//
//
//
//
//
//
class SpaceshipBullet extends Bullet {
  constructor(canvas, ctx, x, y, match) {
    super(canvas, ctx, x, y, match);
    this.speed = 14;
    this.image = new Image();
    this.init();
  }

  init() {
    this.image.src = "./images/bullet-spaceship.png";
  }

  move() {
    this.y -= this.speed;
  }
  draw() {
    this.ctx.drawImage(
      this.image,
      this.x - this.width / 2,
      this.y,
      this.width,
      this.height
    );
  }

  // each bullet is responsible to check the collision
  checkCollisionWithAlien(aliens, bulletIndex) {
    aliens.forEach((row, rowIndex) => {
      row.forEach((alien, alienIndex) => {
        const alienFrontEdge = alien.y + alien.height;
        const alienRearEdge = alien.y;
        const alienLeftEdge = alien.x;
        const alienRightEdge = alien.x + alien.width;

        const withinX =
          this.x < alienRightEdge && this.x + this.width > alienLeftEdge;
        const withinY =
          this.y < alienFrontEdge && this.y + this.height > alienRearEdge;

        if (withinX && withinY) {
          this.match.playInvaderKilledSound();
          this.match.alienArmy.removeAlien(rowIndex, alienIndex);
          this.match.spaceship.removeSpaceshipBullet(bulletIndex);
          this.match.trackScore();
          this.match.game.trackHighScore();
          return true;
        }
      });
    });
  }

  checkCollisionWithAliensBullets(aliensBullets, spaceshipBulletIndex) {
    aliensBullets.forEach((bullet, alienBulletIndex) => {
      const bulletFrontEdge = bullet.y + bullet.height;
      const bulletRearEdge = bullet.y;
      const bulletLeftEdge = bullet.x;
      const bulletRightEdge = bullet.x + bullet.width;

      const withinX =
        this.x < bulletRightEdge && this.x + this.width > bulletLeftEdge;
      const withinY =
        this.y < bulletFrontEdge && this.y + this.height > bulletRearEdge;

      if (withinX && withinY) {
        this.match.spaceship.removeSpaceshipBullet(spaceshipBulletIndex);
        this.match.alienArmy.removeAlienBullet(alienBulletIndex);
      }
    });
  }

  isSpaceshipBulletOutside(bulletIndex) {
    if (this.isBulletOutside()) {
      this.match.spaceship.removeSpaceshipBullet(bulletIndex);
    }
  }
}
//
//
//
//////// ALIEN BULLET ////////////
//
//
//
//
//
//
//
//
//

class AlienBullet extends Bullet {
  constructor(canvas, ctx, x, y, match) {
    super(canvas, ctx, x, y, match);
    this.speed = 4;
    this.image = new Image();
    this.init();
  }

  init() {
    this.image.src = "./images/alien-bullet.png";
  }
  move() {
    this.y += this.speed;
  }
  draw() {
    this.ctx.drawImage(
      this.image,
      this.x - this.width / 2,
      this.y + this.height * 1.5,
      this.width,
      this.height
    );
  }

  // each bullet is responsible to check the collision
  checkCollisionWithSpaceship(spaceship, bulletIndex) {
    const alienFrontEdge = spaceship.y + spaceship.height;
    const alienRearEdge = spaceship.y;
    const alienLeftEdge = spaceship.x;
    const alienRightEdge = spaceship.x + spaceship.width;

    const withinX =
      this.x < alienRightEdge && this.x + this.width > alienLeftEdge;
    const withinY =
      this.y < alienFrontEdge && this.y + this.height > alienRearEdge;

    if (withinX && withinY) {
      this.match.spaceship.trackLives("lose");
      this.match.alienArmy.removeAlienBullet(bulletIndex);
      return true;
    }
  }

  isAlienBulletOutside(bulletIndex) {
    if (this.isBulletOutside()) {
      this.match.alienArmy.removeAlienBullet(bulletIndex);
    }
  }
}
