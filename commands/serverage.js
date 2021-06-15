const { WHITE } = require("../resources/colors.json");
const ms = require("humanize-duration");

module.exports.run = async (msg, args) => {
	let currentDate = new Date();
	let joinedDate = new Date(msg.guild.member(msg.author).joinedTimestamp);
	let createdDate = new Date(msg.guild.createdTimestamp);
	let options = { largest: 2, round: true };

	let descriptionArray = [
		"**__server creation__**",
		`**date**: ${createdDate.toLocaleString()}`,
		`**age**: ${ms(currentDate - createdDate, options)}`,

		`\nyou joined **${ms(createdDate - joinedDate, options)}** after the server's creation`
	];

	msg.channel.send({
		embed: {
			color: WHITE,
			author: {
				name: msg.guild.name,
				icon_url: msg.guild.iconURL()
			},
			description: descriptionArray.join("\n"),
			footer: {
				text: `ms: ${createdDate.getTime()} | ${joinedDate.getTime()}`
			}
		}
	});
}
module.exports.meta = {
	name: "serverage",
	aliases: ["servage", "guildage", "glage", "srvage"],
	description: "tells the age of the server and when you joined",
	usage: "serverage",
	argsRequired: false,
	category: "utility"
}