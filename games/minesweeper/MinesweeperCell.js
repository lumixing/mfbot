const emotes = require("../../resources/emotes.json");

module.exports = class MinesweeperCell {
	constructor(name, style) {
		this.name = name;
		this.style = style;
		this.value = 0;

		this.changeFromName(name);
	}

	// change the cell from the name
	changeFromName(name) {
		if (name === "mine") {
			this.name = name;
			this.emoji = emotes.minesweeper[this.style][10];
		}
		else if (name === "empty") {
			this.name = name;
			this.emoji = emotes.minesweeper[this.style][9];
		}
		else if (name === "flag") {
			this.name = name;
			this.emoji = emotes.minesweeper[this.style][11];
		}
		else {
			this.name = name;
			this.emoji = emotes.minesweeper[this.style][parseInt(name)];
		}
	}

	// get an array of neighbouring cells around this cell
	getNeighbours() {
		// possible 8 cells coords
		const neighbourCoords = [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }];
		let neighboursArray = [];

		neighbourCoords.forEach((c) => {
			let selectedCell = this.grid.getCellAt(c.x + this.x, c.y + this.y);

			// if cell exists push the cell
			if (selectedCell) {
				neighboursArray.push(selectedCell).name;
			}
			// if cell doesnt exist push false
			else {
				neighboursArray.push(false);
			}
		});

		return neighboursArray;
	}

	// logs some info about this cell
	log() {
		console.log(`(${this.x}, ${this.y}) ${this.name} [${this.emoji}]`);
	}
}