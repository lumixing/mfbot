const Minesweeper = require("../games/minesweeper/Minesweeper");
const games = require("../games/games");
const error = require("../functions/error");

module.exports.run = async (msg, args) => {
	let options = {
		init: "0",
		style: "classic"
	};

	if (args[0]) options.init = args[0];
	if (args[1]) options.style = args[1];

	let game = new Minesweeper(msg, games, msg.author, options);
}
module.exports.meta = {
	name: "minesweeper",
	aliases: ["mine", "mn"],
	description: "a game of minesweeper",
	usage: "minesweeper [difficulty] [emoji style]",
	argsRequired: false,
	category: "games"
}