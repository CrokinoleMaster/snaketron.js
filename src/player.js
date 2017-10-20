const ctx = require('axel')

class Player {
	constructor(
		x = 0,
		y = 0,
		dir = 'down',
		color = [255, 0, 0],
		width = 2,
		height = 2
	) {
		this.x = x
		this.y = y
		this.dir = dir
		this.color = color
		this.width = width
		this.height = height
	}

	setDir(dir) {
		this.dir = dir
	}

	move() {
		switch (this.dir) {
			case 'up':
				this.y--
				break
			case 'down':
				this.y++
				break
			case 'left':
				this.x--
				break
			case 'right':
				this.x++
				break
		}
	}

	draw() {
		const { x, y, color, width, height } = this
		ctx.bg(color[0], color[1], color[2])
		ctx.box(x, y, width, height)
	}
}

module.exports = Player
