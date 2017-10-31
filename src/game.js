const ctx = require('axel')
const keypress = require('keypress')

const Player = require('./player')
const Pip = require('./pip')
const { getGameWidth } = require('./utils')

let gameLoop

const p1 = new Player([116, 184, 22], 10, 20, 'down')
const p2 = new Player([92, 124, 250], getGameWidth() - 10, 20, 'down')
const pip = new Pip([244, 49, 49])

function movePip() {
	while (
		(pip.x === p1.x && pip.y === p1.y) ||
		(pip.x === p2.x && pip.y === p2.y)
	) {
		pip.moveToRandLocation()
	}
}

function isCollision(a, b) {
	return a.x === b.x && a.y === b.y
}

function checkCollisions() {
	if (isCollision(p1, pip)) {
		p1.setGrow()
		movePip()
	}
	if (isCollision(p2, pip)) {
		p2.setGrow()
		movePip()
	}
}

function move() {
	p1.move()
	p2.move()
}

function draw() {
	// Clear the terminal
	ctx.clear()
	p1.draw()
	p2.draw()
	pip.draw()
	ctx.cursor.restore()
}

function endGame() {
	if (gameLoop) {
		process.stdin.pause()
		clearInterval(gameLoop)
		ctx.cursor.on()
		ctx.cursor.restore()
	}
}

module.exports.start = function() {
	ctx.cursor.off()
	ctx.clear()
	movePip()
	gameLoop = setInterval(() => {
		draw()
		move()
		checkCollisions()
	}, 1000 / 10)
	process.stdin.setRawMode(true)
	keypress(process.stdin)
	process.stdin.resume()
}

module.exports.registerControls = function() {
	process.stdin.on('keypress', function(ch, key) {
		switch (key.name) {
			case 'escape':
			case 'q':
				endGame()
				break
			case 'w':
				if (p1.dir !== 'down') {
					p1.setDir('up')
				}
				break
			case 's':
				if (p1.dir !== 'up') {
					p1.setDir('down')
				}
				break
			case 'a':
				if (p1.dir !== 'right') {
					p1.setDir('left')
				}
				break
			case 'd':
				if (p1.dir !== 'left') {
					p1.setDir('right')
				}
				break
			case 'up':
				if (p2.dir !== 'down') {
					p2.setDir(key.name)
				}
				break
			case 'down':
				if (p2.dir !== 'up') {
					p2.setDir(key.name)
				}
				break
			case 'left':
				if (p2.dir !== 'right') {
					p2.setDir(key.name)
				}
				break
			case 'right':
				if (p2.dir !== 'left') {
					p2.setDir(key.name)
				}
				break
		}
		if (key && key.ctrl && key.name == 'c') {
			endGame()
		}
	})
}
