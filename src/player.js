const ctx = require('axel')

const { getGameWidth } = require('./utils')

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
			this.body.unshift([x, y - i])
		}
		this.dir = dir
		this.color = color
		this.size = size
	}

	get x() {
		const { body } = this
		return body[body.length - 1][0]
	}

	get y() {
		const { body } = this
		return body[body.length - 1][1]
	}

	setDir(dir) {
		this.dir = dir
	}

	setGrow() {
		this.grow = true
	}

	move() {
		const { body, size, grow } = this
		const [x, y] = body[body.length - 1]
		switch (this.dir) {
			case 'up':
				if (y - size < 0) {
					body.push([x, ctx.rows - size])
				} else {
					body.push([x, y - size])
				}
				break
			case 'down':
				if (y + size > ctx.rows) {
					body.push([x, size])
				} else {
					body.push([x, y + size])
				}
				break
			case 'left':
				if (x - 2 * size < 0) {
					body.push([getGameWidth() - 2 * size, y])
				} else {
					body.push([x - 2 * size, y])
				}
				break
			case 'right':
				if (x + 2 * size > getGameWidth()) {
					body.push([2 * size, y])
				} else {
					body.push([x + 2 * size, y])
				}
				break
		}
		if (!grow) {
			this.body = body.slice(1)
		} else {
			this.grow = false
		}
		for (let i = 0; i < this.body.length - 2; i++) {
			if (
				this.body[i][0] === this.body[this.body.length - 1][0] &&
				this.body[i][1] === this.body[this.body.length - 1][1]
			) {
				this.body = this.body.slice(i)
			}
		}
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
