const ctx = require('axel')

class Player {
	constructor(
		x = 0,
		y = 0,
		dir = 'down',
		color = [0, 255, 0],
		size = 1,
		length = 10
	) {
		this.body = []
		for (let i = 0; i < length; i++) {
			this.body.push([x, y - i])
		}
		this.dir = dir
		this.color = color
		this.size = size
	}

	setDir(dir) {
		this.dir = dir
	}

	move() {
		const { body, size } = this
		const [x, y] = body[body.length - 1]
		switch (this.dir) {
			case 'up':
				body.push([x, y - size])
				break
			case 'down':
				body.push([x, y + size])
				break
			case 'left':
				body.push([x - 2 * size, y])
				break
			case 'right':
				body.push([x + 2 * size, y])
				break
		}
		this.body = body.slice(1)
	}

	draw() {
		const { body, color, size } = this
		body.forEach(([x, y]) => {
			ctx.bg(color[0], color[1], color[2])
			ctx.box(x, y, size * 2, size)
		})
	}
}

module.exports = Player
