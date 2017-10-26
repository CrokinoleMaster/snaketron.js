const ctx = require('axel')

class Pip {
	constructor(color = [255, 0, 0]) {
		this.color = color
		this.moveToRandLocation()
	}

	moveToRandLocation() {
		const x = Math.floor(Math.random() * ctx.cols / 2) * 2
		const y = Math.floor(Math.random() * ctx.rows)
		this.x = x
		this.y = y
	}

	draw() {}
}

module.exports = Pip
