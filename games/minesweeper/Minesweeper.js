const MinesweeperGrid = require("./MinesweeperGrid");
const error = require("../../functions/error");

module.exports = class Minesweeper {
	constructor(msg, games, player, options) {
		this.msg = msg;
		this.games = games;
		this.player = player;
		this.options = options;
		this.server = msg.guild;
		this.createdDate = Date.now();
		this.id = `minesweeper/${this.server.id}/${this.player.id}`

		this.createGame();

		this.grid = new MinesweeperGrid(9); // creates a new grid 9x9

		this.grid.game = this;
		this.grid.init(); // fills it with cells
		this.grid.placeMines(10);
		this.grid.placeNumbers(); // places numbers around placed mines
		this.grid.sendEmbed(msg); // prints embed msg with grid
		this.awaitForResponse(msg);
	}

	createGame() {
		if (!(this.server.id in this.games.minesweeper)) {
			this.games.minesweeper[this.server.id] = {};
		}
		this.games.minesweeper[this.server.id][this.player.id] = this;
	}

	async awaitForResponse(msg) {
		const filter = (m) => m.author.id === this.player.id;

		try {
			const collection = await msg.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ["time"] });
			const reply = collection.first();

			if (reply.content.toLowerCase() === "end") {
				msg.reply("ended the game");
				return this.endGame();
			}

			let x = parseInt(reply.content[0]);
			let y = parseInt(reply.content[1]);

			if (isNaN(x) || isNaN(y)) {
				error(msg, "your answer must be in this format: `xy` => `31`\n3 being x and 1 being y");
				return this.awaitForResponse(msg);
			}

			let cell = this.grid.getCellAt(y, x);

			cell.hidden = false;

			if (cell.name === "mine") {
				msg.reply("u lost LOL");
				this.grid.sendEmbed(msg); // prints embed msg with grid
				return this.endGame();
			}

			if (cell.name === "0") {
				let zeroCoords = [];

				for (let _x = 0; _x < this.size; _x++) {
					for (let _y = 0; _y < this.size; _y++) {
						if (this.grid.getCellAt(_x, _y).name === "0") {
							zeroCoords.push({ x: _x, y: _y });
						}
					}
				}

				let locationsToUncover = [];
				locationsToUncover.push({ x: x, y: y });
				const neighbourCoords = [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }];

				while (locationsToUncover.length > 0) {
					for (var i = 0; i < neighbourCoords.length; i++) {
						let newCoord = { x: locationsToUncover[0].x + neighbourCoords[i].x, y: locationsToUncover[0].y + neighbourCoords[i].y };
						if (!this.grid.getCellAt(newCoord.x, newCoord.y) || !this.grid.getCellAt(newCoord.x, newCoord.y).hidden) continue;
						this.grid.getCellAt(newCoord.x, newCoord.y).hidden = false;

						// Continue uncovering
						if (this.grid.getCellAt(newCoord.x, newCoord.y).name === "0") {
							locationsToUncover.push(newCoord);
						}
					}

					locationsToUncover.shift();
				}
			}

			this.grid.sendEmbed(msg); // prints embed msg with grid
			this.awaitForResponse(msg);
		}
		catch (err) {
			console.log("didnt respond :(");
			console.error(err);
			this.endGame();
		}
	}

	endGame() {
		try {
			console.log(`successfully deleted game ${this.id}`);
			delete this.games.minesweeper[this.server.id][this.player.id];
		}
		catch (error) {
			console.error(`couldnt delete game ${this.id}`, error);
		}
	}
}