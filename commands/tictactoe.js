const error = require("../functions/error");

const TicTacToe = require("../games/TicTacToe");
const games = require("../games/games");

module.exports.run = async (msg, args) => {
	if (msg.guild.id in games.tictactoe && msg.author.id in games.tictactoe[msg.guild.id]) {
		return msg.reply("you are already in a game!");
	}

	let player2 = msg.mentions.members.first();

	if (!player2) {
		return error(msg, "you need to mention a member for player2");
	}

	if (player2.id === msg.author.id) {
		return error(msg, "you cant play with yourself...");
	}

	if (msg.guild.id in games.tictactoe && player2.id in games.tictactoe[msg.guild.id]) {
		return msg.reply(`${player2.nickname} is already in a game!`);
	}

	let newGame = new TicTacToe(msg, games, msg.author, player2.user);

	if (!(msg.guild.id in games.tictactoe)) {
		games.tictactoe[msg.guild.id] = {};
	}

	games.tictactoe[msg.guild.id][msg.author.id] = newGame;
	games.tictactoe[msg.guild.id][player2.id] = newGame;
}
module.exports.meta = {
	name: "tictactoe",
	aliases: ["ttt"],
	description: "a game of tic tac toe",
	usage: "tictactoe [@player2]",
	argsRequired: true,
	category: "games"
}