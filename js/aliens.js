class Alien {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.image = new Image()
    this.width = 20
    this.height = 20
    this.x = this.canvas.width / 2
    this.y = this.canvas.height / 3
    this.aliensMoveSpeed = 3
    this.init()
  }
  init() {
    this.image.src = "./images/alienWhite.png";
    this.image.addEventListener("load", () => this.draw());
  }
	draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height); 

	}
	move() {
	}
	shoot() {
    
	}
}