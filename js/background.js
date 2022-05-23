class Background {
  constructor(canvas, ctx, backgroundMoveSpeed) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.moveSpeed = backgroundMoveSpeed;
    this.image = new Image();
    this.y = 0;
    this.init();
  }

  init() {
    this.image.src = "./images/spaceBackground.png";
    this.image.addEventListener("load", () => this.draw());
  }

  draw() {
    this.ctx.drawImage(this.image, 0, this.y, canvas.width, canvas.height);
    this.ctx.drawImage(
      this.image,
      0,
      this.y - this.canvas.height,
      canvas.width,
      canvas.height
    );
  }
  move() {
    this.y += this.moveSpeed;
    if (this.y >= this.canvas.height) {
      this.y = 0;
    }
  }
}
