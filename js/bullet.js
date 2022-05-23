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
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  move() {
    this.y -= this.moveSpeed;
  }
}

class SpaceshipBullet extends Bullet {
  constructor(canvas, ctx, x, y, game) {
    super(canvas, ctx, x, y, game);
  }

  // each bullet is responsible to check the collision
  checkCollision(aliens) {
    const alienFrontEdge = aliens.y + aliens.height;
    const alienRearEdge = aliens.y;
    const alienLeftEdge = aliens.x;
    const alienRightEdge = aliens.x + aliens.width;

    const withinX =
      this.x < alienRightEdge && this.x + this.width > alienLeftEdge;
    const withinY =
      this.y < alienFrontEdge && this.y + this.height > alienRearEdge;

    if (withinX && withinY) {
      this.game.withdrawAlien()
    }
    return !(withinX && withinY);
  }
}

class AlienBullet extends Bullet {
  constructor(canvas, ctx, x, y, game) {
    super(canvas, ctx, x, y, game);
  }

  // each bullet is responsible to check the collision
  checkCollision() {}
}
