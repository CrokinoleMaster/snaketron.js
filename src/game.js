const ctx = require('axel')
const keypress = require('keypress')

const Player = require('./player')
const Pip = require('./pip')
const { getGameWidth } = require('./utils')

let gameLoop

const p1 = new Player(10, 20, 'down', [0, 255, 0])
const p2 = new Player(getGameWidth() - 10, 20, 'down', [0, 0, 255])
const pip = new Pip()
while (
	(pip.x === p1.x && pip.y === p1.y) ||
	(pip.x === p2.x && pip.y === p2.y)
) {
	pip.moveToRandLocation()
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
	move()
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
	gameLoop = setInterval(draw, 1000 / 10)
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
			case 'up':
			case 'down':
			case 'left':
			case 'right':
				p1.setDir(key.name)
				break
		}
		if (key && key.ctrl && key.name == 'c') {
			endGame()
		}
	})
}
