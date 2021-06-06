const ta = require("time-ago");
const error = require("../functions/error");

module.exports.run = async (msg, args) => {
	let date = new Date(parseInt(args[0]));

	if (!args.length) {
		date = new Date();
		return msg.channel.send(`${date.getTime()}\n${date.toLocaleString()}`);
	}

	return msg.channel.send(`${date.getTime()}\n${date.toLocaleString()}\n${ta.ago(date)}`);
}
module.exports.meta = {
	name: "millis",
	aliases: ["ms"],
	description: "sends millis or converts it to a date and time",
	usage: "millis (ms)",
	argsRequired: false,
	category: "utility"
}