const error = require("../functions/error");
const success = require("../functions/success");

const HigherLower = require("../games/HigherLower");
const games = require("../games/games");

module.exports.run = async (msg, args) => {
	let max = parseInt(args[0]);

	if (max > 1000000) {
		max = 1000000;
	}

	if (isNaN(max) || Math.sign(max) !== 1) {
		max = 100;
	}

	let newGame = new HigherLower(msg, games, msg.author, max);

	if (!(msg.guild.id in games.higherlower)) {
		games.higherlower[msg.guild.id] = {};
	}

	games.higherlower[msg.guild.id][msg.author.id] = newGame;
}
module.exports.meta = {
	name: "higherlower",
	aliases: ["hl"],
	description: "a game of higher lower",
	usage: "higherlower (max number)",
	argsRequired: false,
	category: "games"
}