const { WHITE } = require("../resources/colors.json");
const error = require("../functions/error");
const ms = require("humanize-duration");

module.exports.run = async (msg, args) => {
	let user = msg.author;
	let member = msg.guild.member(user);
	let mention = msg.mentions.members.first();

	if (args.length > 0 && !mention) {
		return error(msg, "you need to mention a member");
	}

	if (args.length > 0 && mention.user) {
		user = mention.user;
		member = mention;
	}

	let currentDate = new Date();
	let createdDate = new Date(user.createdTimestamp);
	let joinedDate = new Date(member.joinedTimestamp);
	let options = { largest: 2, round: true };

	let descriptionArray = [
		"**__account creation__**",
		`**date**: ${createdDate.toLocaleString()}`,
		`**age**: ${ms(currentDate - createdDate, options)}`,

		"\n**__server joined__**",
		`**date**: ${joinedDate.toLocaleString()}`,
		`**age**: ${ms(currentDate - joinedDate, options)}`,
	];

	msg.channel.send({
		embed: {
			color: WHITE,
			author: {
				name: user.tag,
				icon_url: user.avatarURL()
			},
			description: descriptionArray.join("\n"),
			footer: {
				text: `ms: ${createdDate.getTime()} | ${joinedDate.getTime()}`
			}
		}
	});
}
module.exports.meta = {
	name: "age",
	aliases: [],
	description: "tells the age of your discord account and when you joined the server",
	usage: "age",
	argsRequired: false,
	category: "utility"
}