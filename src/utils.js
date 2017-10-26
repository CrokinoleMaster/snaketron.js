const ctx = require('axel')

module.exports.getGameWidth = () => {
	return ctx.cols + ctx.cols % 2
}
