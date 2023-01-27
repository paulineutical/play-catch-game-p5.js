class Frisbee {
    constructor () {
        this.width = 100
        this.height = 30
        this.x = window.innerWidth + 200
        this.y = 650
		this.xSpeed = -12
        this.ySpeed = -17
        this.gravity = 1
        this.gravityChange = Math.random() * 0.1 + 0.25
        this.lifetime = 150
    }

    draw() {
        image(game.frisbeeImage, this.x, this.y, this.width, this.height)
        this.x += this.xSpeed
        this.y += this.ySpeed 
        this.y += this.gravity
        this.gravity += this.gravityChange 
        this.lifetime -= 1
    }

    isAlive() {
        return this.lifetime > 0;
    }

    collision(playerInfo) {
        // Get the middle of the obstacle
		let frisbeeX = this.x + this.width / 2
		let frisbeeY = this.y + this.height / 2

		// Get the middle of the player
		let playerX = playerInfo.x + playerInfo.width / 2
		let playerY = playerInfo.y + playerInfo.height / 2

         // dist(x1, y1, x2, y2) returns the distance between the objects
		if (dist(frisbeeX, frisbeeY, playerX, playerY) > 70) {
			return false
		} else {
			return true
		}
    }
}


