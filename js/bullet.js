class Bullet {
  constructor(canvas, ctx, x, y, game) {
    this.game = game;
    this.canvas = canvas;
    this.ctx = ctx;
    this.width = 5;
    this.height = 5;
    this.x = x;
    this.y = y;
    this.moveSpeed = 2;
  }
  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.x - this.width/2, this.y, this.width, this.height);
  }
  isBulletOutside() {
    if(this.x > this.canvas.width) {
      return true
    }
    if (this.y > this.canvas.height) {
      return true
    }
    if (this.y < 0) {
      return true
    }
    if (this.x < 0) {
      return true
    }
    return false
  }
}

class SpaceshipBullet extends Bullet {
  constructor(canvas, ctx, x, y, game) {
    super(canvas, ctx, x, y, game);
  }
  move() {
    this.y -= this.moveSpeed;
  }

  // each bullet is responsible to check the collision
  checkCollisionWithAlien(aliens, bulletIndex) {
    aliens.forEach((alien, alienIndex) => {
      const alienFrontEdge = alien.y + alien.height;
      const alienRearEdge = alien.y;
      const alienLeftEdge = alien.x;
      const alienRightEdge = alien.x + alien.width;

      const withinX =
        this.x < alienRightEdge && this.x + this.width > alienLeftEdge;
      const withinY =
        this.y < alienFrontEdge && this.y + this.height > alienRearEdge;

      if (withinX && withinY) {
        this.game.alienArmy.removeAlien(alienIndex);
        this.game.spaceship.removeSpaceshipBullet(bulletIndex);
        return true;
      }
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
        this.game.spaceship.removeSpaceshipBullet(spaceshipBulletIndex);
        this.game.alienArmy.removeAlienBullet(alienBulletIndex);
      }
    });
  }


  isSpaceshipBulletOutside(bulletIndex) {
    if (this.isBulletOutside()) {
      this.game.spaceship.removeSpaceshipBullet(bulletIndex)
    }
  }
}

class AlienBullet extends Bullet {
  constructor(canvas, ctx, x, y, game) {
    super(canvas, ctx, x, y, game);
  }
  move() {
    this.y += this.moveSpeed;
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
      this.game.removeSpaceship();
      this.game.alienArmy.removeAlienBullet(bulletIndex);
      return true;
    }
  }

  isAlienBulletOutside(bulletIndex) {
    if (this.isBulletOutside()) {
      this.game.alienArmy.removeAlienBullet(bulletIndex)
    }
  }
}
