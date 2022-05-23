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
    this.spaceshipMoveSpeed = 20;
    this.bullets = []
    this.init();
  }

  init() {
    this.image.src = "./images/spaceship.png";
    this.image.addEventListener("load", () => this.draw());
  }
  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  move(direction) {
    if (direction === "left") {
      if (this.x < this.width / 2) return;
      this.x -= this.spaceshipMoveSpeed;
    }
    if (direction === "right") {
      if (this.x > this.canvas.width - this.width * 1.5) return;
      this.x += this.spaceshipMoveSpeed;
    }
  }
  shoot() {
    console.log('shoot');
    const newBullet = new SpaceshipBullet(
      this.canvas,
      this.ctx,
      this.x + this.width / 2,
      this.y,
      this.game,
    );
    this.bullets.push(newBullet);
    console.log('object', this.bullets);
  }

  removeBullet(aliens) {
    if (this.bullets.length > 0) {
      this.bullets = this.bullets.filter((bullet) => {
        // console.log('bullet.checkCollision(aliens)', bullet.checkCollision(aliens));
        return !(bullet.checkCollision(aliens));
      });
    }
  }

}


