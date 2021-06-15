const MinesweeperCell = require("./MinesweeperCell");
const { WHITE } = require("../../resources/colors.json");
const emotes = require("../../resources/emotes.json");

module.exports = class MinesweeperGrid {
	constructor(size) {
		this.size = size;
		this.grid;
	}

	// creates a 2d grid and fills it with cells
	init() {
		this.grid = new Array(this.size);

		for (let i = 0; i < this.size; i++) {
			this.grid[i] = new Array(this.size);
		}

		// set each cell in the grid to 0
		for (let x = 0; x < this.size; x++) {
			for (let y = 0; y < this.size; y++) {
				let cell = new MinesweeperCell("0", this.game.options.style);

				cell.grid = this;
				cell.x = x;
				cell.y = y;
				cell.hidden = true;

				this.grid[x][y] = cell;
			}
		}
	}

	// returns the cell in the coords of the grid
	getCellAt(x, y) {
		if (x < 0 || x >= this.size || y < 0 || y >= this.size) return false;
		return this.grid[x][y];
	}

	// places mines randomly in the grid
	placeMines(minesNum) {
		for (let mine = 0; mine < minesNum; mine++) {
			let x = Math.floor(Math.random() * this.size);
			let y = Math.floor(Math.random() * this.size);

			// if already a mine there, redo step
			if (this.getCellAt(x, y).name === "mine") {
				mine--;
				continue;
			}

			this.getCellAt(x, y).changeFromName("mine");
		}
	}

	// returns array of all mines in grid
	getMines() {
		let minesArray = [];

		for (let x = 0; x < this.size; x++) {
			for (let y = 0; y < this.size; y++) {
				if (this.getCellAt(x, y).name === "mine") {
					minesArray.push(this.getCellAt(x, y));
				}
			}
		}

		return minesArray;
	}

	// places numbers around the mines
	placeNumbers() {
		this.getMines().forEach((m) => {
			// get the neighbours foreach mine
			m.getNeighbours().forEach((n) => {
				if (!n) return; // if outside of board
				if (n.name === "mine") return; // if its a mine

				// update its value
				n.value++;
				n.changeFromName(n.value);
			});
		});
	}

	// return a string with a formatted grid
	formatGrid() {
		let emojiGrid = [];

		for (let x = 0; x < this.size; x++) {
			let tempArray = [];
			for (let y = 0; y < this.size; y++) {
				let cell = this.getCellAt(x, y);

				if (cell.hidden) {
					tempArray.push(emotes.minesweeper[this.game.options.style][9]);
				}
				else {
					tempArray.push(cell.emoji);
				}
			}
			emojiGrid.push(tempArray.join(""));
		}

		return emojiGrid.join("\n");
	}

	// send an embed message with the grid and other info
	async sendEmbed(msg) {
		let m = await msg.channel.send({
			embed: {
				color: WHITE,
				description: this.formatGrid()
			}
		});

		console.log(`send embed with ${m.embeds[0].length} characters`);
	}
}