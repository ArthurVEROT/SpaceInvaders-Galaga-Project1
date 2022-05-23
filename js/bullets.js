class Bullets {
  constructor() {
  }
	draw() {
	}
	move() {
	}
  clear() {

  }
}

class AliensBullets extends Bullets {
  constructor() {
    this.aliensBulletsMoveSpeed = 10
  }
	// each bullet is responsible to check the collision
	checkCollision() {
	}
}

class SpaceshipBullets extends Bullets {
  constructor() {
    this.spaceshipsBulletsMoveSpeed = 10
  }
	// each bullet is responsible to check the collision
	checkCollision() {
	}
}