const emotes = require("../resources/emotes.json");
const colors = require("../resources/colors.json");

module.exports = class HigherLower {
	#games;
	#board;
	#x;
	#o;
	#turn;

	constructor(msg, games, player1, player2) {
		this.server = msg.guild;
		this.player1 = player1;
		this.player2 = player2;
		this.date = Date.now();
		this.#games = games;

		this.init();

		this.sendEmbedTurn(msg);
		this.awaitResponse(msg, this.#turn);
	}

	initXO() {
		if (Math.random() < 0.5) {
			this.#x = this.player1;
			this.#o = this.player2;
		}
		else {
			this.#x = this.player2;
			this.#o = this.player1;
		}
	}

	initTurn() {
		if (Math.random() < 0.5) {
			this.#turn = this.#x;
			this.#turn.symbol = "x";
		}
		else {
			this.#turn = this.#o;
			this.#turn.symbol = "o";
		}
	}

	initBoard() {
		let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		this.#board = arr.map((n) => emotes[`TTe${n}`]);
	}

	init() {
		this.initXO();
		this.initTurn();
		this.initBoard();
	}

	printBoard() {
		const b = this.#board;
		return `${b[0]}${b[1]}${b[2]}\n${b[3]}${b[4]}${b[5]}\n${b[6]}${b[7]}${b[8]}`;
	}

	sendEmbedTurn(msg) {
		let embedColor;

		if (this.#turn.symbol === "x") embedColor = colors.DARK_GREEN;
		else if (this.#turn.symbol === "o") embedColor = colors.DARK_RED;

		msg.channel.send({
			embed: {
				color: embedColor,
				author: {
					name: `${this.#turn.username}'s turn (${this.#turn.symbol})`,
					icon_url: this.#turn.avatarURL()
				},
				description: this.printBoard(),
				footer: {
					text: "type \"end\" to end the game"
				}
			}
		});
	}

	sendEmbedEnd(msg, title) {
		let embedColor = colors.WHITE;

		if (this.#turn.symbol === "x") embedColor = colors.DARK_GREEN;
		else if (this.#turn.symbol === "o") embedColor = colors.DARK_RED;

		msg.channel.send({
			embed: {
				color: embedColor,
				title: title,
				description: this.printBoard()
			}
		});
	}

	async awaitResponse(msg) {
		let filter = (m) => m.author.id === this.#x.id || m.author.id === this.#o.id;
		msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ["time"] })
			.then((response) => {
				let author = response.first().author;
				response = response.first().content;

				if (this.checkForQuit(msg, response, author)) return;

				if (this.checkForWrongTurn(msg, author)) return

				response = parseInt(response);

				if (this.checkForInvalid(msg, response)) return;
				if (this.checkForOccupied(msg, response)) return;

				this.updateBoard(response - 1, this.#turn);

				if (this.checkForEndGame(msg)) return;

				this.switchTurns();
				this.sendEmbedTurn(msg);
				this.awaitResponse(msg);
			})
			.catch((err) => {
				msg.channel.send(`<@${this.#turn.id}> ran out of time and the game ended in a tie`);
				return this.deleteGame();
			});
	}

	checkForQuit(msg, response, author) {
		if (response === "end") {
			msg.channel.send(`<@${author.id}> ended the game.`);
			this.deleteGame();
			return true;
		}
	}

	checkForWrongTurn(msg, author) {
		if (author.id !== this.#turn.id) {
			msg.channel.send(`<@${author.id}>, its not your turn yet!`);
			this.awaitResponse(msg);
			return true;
		}
	}

	checkForInvalid(msg, response) {
		if (!this.#board[response - 1]) {
			msg.channel.send("that is not a valid square, send a number 1-9");
			this.awaitResponse(msg, this.#turn);
			return true;
		}
	}

	checkForOccupied(msg, response) {
		if (!this.#board[response - 1].match("e")) {
			msg.channel.send("that square is occupied, try another square");
			this.awaitResponse(msg, this.#turn);
			return true;
		}
	}

	checkForEndGame(msg) {
		if (this.won("x")) {
			this.sendEmbedEnd(msg, `${emotes.TTx} ${this.#x.username} won!`);
			this.deleteGame();
			return true;
		}

		if (this.won("o")) {
			this.sendEmbedEnd(msg, `${emotes.TTo} ${this.#o.username} won!`);
			this.deleteGame();
			return true;
		}

		if (this.#board.every((n) => !n.match("e"))) {
			this.sendEmbedEnd(msg, "its a tie!");
			this.deleteGame();
			return true;
		}
	}

	switchTurns() {
		if (this.#turn.id === this.#x.id) {
			this.#turn = this.#o;
			this.#turn.symbol = "o";
		}
		else if (this.#turn.id === this.#o.id) {
			this.#turn = this.#x;
			this.#turn.symbol = "x";
		}
	}

	updateBoard(index, turn) {
		this.#board[index] = emotes[`TT${turn.symbol}`];
	}

	deleteGame() {
		delete this.#games.tictactoe[this.server.id][this.player1.id];
		delete this.#games.tictactoe[this.server.id][this.player2.id];
	}

	won(s) {
		let b = this.#board;
		if ((b[0] === b[1]) && (b[1] === b[2]) && (b[2] === emotes[`TT${s}`])) return true;
		if ((b[3] === b[4]) && (b[4] === b[5]) && (b[5] === emotes[`TT${s}`])) return true;
		if ((b[6] === b[7]) && (b[7] === b[8]) && (b[8] === emotes[`TT${s}`])) return true;
		if ((b[0] === b[3]) && (b[3] === b[6]) && (b[6] === emotes[`TT${s}`])) return true;
		if ((b[1] === b[4]) && (b[4] === b[7]) && (b[7] === emotes[`TT${s}`])) return true;
		if ((b[2] === b[5]) && (b[5] === b[8]) && (b[8] === emotes[`TT${s}`])) return true;
		if ((b[0] === b[4]) && (b[4] === b[8]) && (b[8] === emotes[`TT${s}`])) return true;
		if ((b[2] === b[4]) && (b[4] === b[6]) && (b[6] === emotes[`TT${s}`])) return true;
	}
}