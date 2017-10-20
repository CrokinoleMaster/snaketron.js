#!/usr/bin/env node
'use strict'
const meow = require('meow')
const game = require('./src/game')

const cli = meow(`
	Usage
	  $ <%= moduleName %> [input]

	Options
	  --foo  Lorem ipsum [Default: false]

	Examples
	  $ <%= moduleName %>
	  unicorns & rainbows
	  $ <%= moduleName %> ponies
	  ponies & rainbows
`)

game.start()
game.registerControls()
