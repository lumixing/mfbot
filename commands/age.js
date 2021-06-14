const { WHITE } = require("../resources/colors.json");
const error = require("../functions/error");
const ms = require("humanize-duration");

module.exports.run = async (msg, args) => {
	let user = msg.author;
	let mention = msg.mentions.members.first();

	if (args.length > 0 && !mention) {
		return error(msg, "you need to mention a member");
	}

	if (args.length > 0 && mention.user) {
		user = mention.user;
	}

	let currentDate = new Date();
	let createdDate = new Date(user.createdTimestamp);
	let options = { largest: 2, round: true };

	let descriptionArray = [
		`**created date**: ${createdDate.toLocaleString()}`,
		`**created ms**: ${createdDate.getTime()}`,
		`**age**: ${ms(currentDate - createdDate, options)}`,
		`**birthday in**: ${ms(createdDate.setFullYear(currentDate.getFullYear()) - currentDate, options)}`
	];

	msg.channel.send({
		embed: {
			color: WHITE,
			author: {
				name: user.tag,
				icon_url: user.avatarURL()
			},
			description: descriptionArray.join("\n")
		}
	});
}
module.exports.meta = {
	name: "age",
	aliases: [],
	description: "tells the age of your discord account",
	usage: "age",
	argsRequired: false,
	category: "utility"
}