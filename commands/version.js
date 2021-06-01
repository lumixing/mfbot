const { WHITE } = require("../resources/colors.json");
const { dependencies, version } = require("../package.json");

module.exports.run = async (msg, args) => {
	let descriptionArray = [
		`**mfbot version**: ${version}`,
		`**discord.js version**: ${dependencies["discord.js"]}`,
	];

	msg.channel.send({
		embed: {
			color: WHITE,
			author: {
				name: `mfbot v${version}`,
				icon_url: msg.client.user.avatarURL()
			},
			description: descriptionArray.join("\n")
		}
	});
}
module.exports.meta = {
	name: "version",
	aliases: ["ver"],
	description: "version of mfbot and other libraries",
	usage: "version",
	argsRequired: false,
	category: "utility"
}