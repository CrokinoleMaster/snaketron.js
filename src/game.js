const ctx = require('axel')
const keypress = require('keypress')

let gameLoop
let dir = 'down'
let x,
	y = 2

function move() {
	switch (dir) {
		case 'down':
			y++
			break
	}
}

function draw() {
	// Clear the terminal
	ctx.clear()
	// Red box
	ctx.bg(255, 0, 0)
	ctx.box(x, y, 2, 2)

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
		if (key) {
			if (key.name == 'escape') endGame()
			if (key.name == 'q') endGame()
			if (key.name == 'left') dir = 'left'
			if (key.name == 'right') dir = 'right'
			if (key.name == 'up') dir = 'up'
			if (key.name == 'down') dir = 'down'
		}

		if (key && key.ctrl && key.name == 'c') {
			endGame()
		}
	})
}
