const ctx = require('axel')
const keypress = require('keypress')

const Player = require('./player')

let gameLoop

const p1 = new Player(2, 2, 'down', [255, 0, 0])
const p2 = new Player(98, 2, 'down', [0, 0, 255])

function move() {
	p1.move()
	p2.move()
}

function draw() {
	// Clear the terminal
	ctx.clear()
	p1.draw()
	p2.draw()
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
