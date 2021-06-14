const { WHITE } = require("../resources/colors.json");
const error = require("../functions/error");
const ms = require("humanize-duration");

module.exports.run = async (msg, args) => {
	let date = new Date(parseInt(args[0]));

	if (!args.length) {
		date = new Date();
	}

	if (isNaN(date.getTime())) {
		return error(msg, "that is not a valid date, enter a millis number");
	}

	let diffDate = new Date(new Date() - date);
	let agoOrFromNow = Math.sign(diffDate.getTime()) === 1 ? "ago" : "from now";
	let options = { largest: 2, round: true };

	let descriptionArray = [
		`**date**: ${date.toLocaleString()}`,
		`**ms**: ${date.getTime()}`
	];

	if (args.length) descriptionArray.push(`**time ${agoOrFromNow}**: ${ms(diffDate, options)}`);

	msg.channel.send({
		embed: {
			color: WHITE,
			description: descriptionArray.join("\n")
		}
	});
}
module.exports.meta = {
	name: "millis",
	aliases: ["ms"],
	description: "sends millis or converts it to a date and time",
	usage: "millis (ms)",
	argsRequired: false,
	category: "utility"
}