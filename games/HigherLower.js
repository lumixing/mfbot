module.exports = class HigherLower {
	#games;

	constructor(msg, games, player) {
		this.player = player;
		this.server = msg.guild;
		this.#games = games;
		this.date = Date.now();
		this.number = Math.floor(Math.random() * 100) + 1;
		this.tries = 1;

		this.start(msg);
		this.awaitAnswer(msg);
	}

	start(msg) {
		msg.channel.send("started game! type a number 1-100 to guess it...");
	}

	awaitAnswer(msg) {
		let filter = (m) => m.author.id === this.player.id;
		msg.channel.awaitMessages(filter, { time: 30000, max: 1 })
			.then((c) => {
				let m = c.first().content;
				let s = m;
				m = parseInt(m);

				if (s == "exit") {
					return this.endGame(msg, "exited game");
				}
				if (isNaN(m)) {
					return this.retry(msg, "your answer needs to be a number, try again...", false);
				}
				if (m < 1 || m > 100) {
					return this.retry(msg, "your answer must be between 1-100, try again...", false);
				}
				if (m < this.number) {
					return this.retry(msg, `higher!`, true);
				}
				if (m > this.number) {
					return this.retry(msg, `lower!`, true);
				}
				if (m === this.number) {
					return this.endGame(msg, `yay! you won with ${this.tries} tries! the number was ${this.number}`);
				}
				else {
					return this.retry(msg, "if u see this something broke... try again...", false);
				}
			})
	}

	retry(msg, text, countAsTry) {
		if (countAsTry) this.tries++;
		msg.reply(text);
		this.awaitAnswer(msg);
	}

	endGame(msg, text) {
		msg.reply(text);
		delete this.#games[this.server.id][this.player.id];
		msg.reply(`successfully deleted game ( ${this.server.id}#${this.player.id}@${this.date})`);
	}
}