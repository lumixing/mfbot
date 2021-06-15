const gifs = require("../resources/gifs.json");
const error = require("../functions/error");

module.exports.run = async (msg, args) => {
	let length = gifs.gifs.length;
	let rng = Math.floor(Math.random() * length);
	let gif = gifs.gifs[rng];

	msg.channel.send(gif)
		.catch((err) => error(msg, "couldnt send that gif"));
}
module.exports.meta = {
	name: "gif",
	aliases: [],
	description: "sends a random gif",
	usage: "gif",
	argsRequired: false,
	category: "fun"
}