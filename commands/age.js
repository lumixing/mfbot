const { WHITE } = require("../resources/colors.json");
const error = require("../functions/error");
const ta = require("time-ago");

module.exports.run = async (msg, args) => {
	let user = msg.author;
	let mention = msg.mentions.members.first();

	if (args.length > 0 && !mention) {
		return error(msg, "you need to mention a member");
	}

	if (args.length > 0 && mention.user) {
		user = mention.user;
	}

	msg.channel.send({
		embed: {
			color: WHITE,
			author: {
				name: user.tag,
				icon_url: user.avatarURL()
			},
			description: `**created at**: ${new Date(user.createdTimestamp).toLocaleString()}\n**age**: ${ta.ago(user.createdTimestamp)}`
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