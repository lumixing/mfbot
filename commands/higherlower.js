const error = require("../functions/error");
const success = require("../functions/success");

const HigherLower = require("../games/HigherLower");
const games = require("../games/higherlowergames");

module.exports.run = async (msg, args) => {
	if (args[0] === "view") {
		return console.log(games);
	}

	let newGame = new HigherLower(msg, games, msg.author);

	if (!(msg.guild.id in games)) {
		games[msg.guild.id] = {};
	}

	games[msg.guild.id][msg.author.id] = newGame;
}
module.exports.meta = {
	name: "higherlower",
	aliases: ["hl"],
	description: "a game of higher lower",
	usage: "higherlower",
	argsRequired: false,
	category: "games"
}