class Alien {
  constructor(canvas, ctx, x, y, match) {
    this.match = match;
    this.canvas = canvas;
    this.ctx = ctx;
    this.image = new Image();
    this.width = 20;
    this.height = 20;
    this.x = x;
    this.y = y;
    this.aliensMoveSpeed = 3;
    this.init();
  }
  init() {
    this.image.src = "./images/alienWhite.png";
    this.image.addEventListener("load", () => this.draw());
  }
  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  shoot() {
    const newBullet = new AlienBullet(
      this.canvas,
      this.ctx,
      this.x + this.width / 2,
      this.y,
      this.match
    );
    this.match.alienArmy.aliensBullets.push(newBullet);
  }

  move() {}
}
