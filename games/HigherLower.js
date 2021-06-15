module.exports = class HigherLower {
	#games;
	#max;
	#number;
	#tries;

	constructor(msg, games, player, max) {
		this.server = msg.guild;
		this.player = player;
		this.date = Date.now();
		this.#games = games;
		this.#max = max;
		this.#number = Math.floor(Math.random() * this.#max) + 1;
		this.#tries = 1;

		this.start(msg);
		this.awaitAnswer(msg);
	}

	start(msg) {
		msg.channel.send(`started game! type a number 1-${this.#max} to guess it... type \`end\` to end the game`);
	}

	awaitAnswer(msg) {
		let filter = (m) => m.author.id === this.player.id;
		msg.channel.awaitMessages(filter, { time: 30000, max: 1, errors: ["time"] })
			.then((c) => {
				let m = c.first().content;
				let s = m;
				m = parseInt(m);

				if (s === "end") {
					return this.endGame(msg, `ended the game, number was ${this.#number}`);
				}
				if (isNaN(m)) {
					return this.retry(msg, "your answer needs to be a number, try again...");
				}
				if (m < 1 || m > this.#max) {
					return this.retry(msg, `your answer must be between 1-${this.#max}, try again...`);
				}
				if (m < this.#number) {
					return this.retry(msg, `higher!`, true);
				}
				if (m > this.#number) {
					return this.retry(msg, `lower!`, true);
				}
				if (m === this.#number) {
					return this.endGame(msg, `yay! you won with ${this.#tries} tries! the number was ${this.#number}`);
				}
				else {
					return this.retry(msg, "seems like u something broke... try again...");
				}
			})
			.catch((err) => {
				return this.endGame(msg, `you ran out of time! number was ${this.#number}`);
			})
	}

	retry(msg, text, countAsTry = false) {
		if (countAsTry) this.#tries++;
		msg.reply(text);
		this.awaitAnswer(msg);
	}

	endGame(msg, text) {
		msg.reply(text);
		delete this.#games.higherlower[this.server.id][this.player.id];
	}
}