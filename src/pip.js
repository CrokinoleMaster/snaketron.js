const ctx = require('axel')

const { getGameWidth } = require('./utils')

class Pip {
	constructor(
		color = [255, 0, 0],
		x = getGameWidth() / 2,
		y = Math.floor(ctx.rows / 2),
		size = 1
	) {
		this.color = color
		this.size = size
		this.moveToRandLocation()
	}

	moveToRandLocation() {
		const x = Math.floor(Math.random() * ctx.cols / 2) * 2
		const y = Math.floor(Math.random() * ctx.rows)
		this.x = x
		this.y = y
	}

	draw() {
		const { color, x, y, size } = this
		ctx.bg(color[0], color[1], color[2])
		ctx.box(x, y, size * 2, size)
	}
}

module.exports = Pip

// change 1
//
//
//
// change 3
//
// change 5
