const { WHITE } = require("../resources/colors.json");
const { prefix } = require("../resources/config.json");
const error = require("../functions/error");

module.exports.run = async (msg, args) => {
	let commandsArray = [];

	msg.client.commands.each((cmd) => {
		commandsArray.push(`\`${cmd.meta.name}\``);
	});

	return msg.channel.send({
		embed: {
			color: WHITE,
			author: {
				name: "mfbot commands",
				icon_url: msg.client.user.avatarURL()
			},
			title: `type \`${prefix}help [command name]\` for more info about a command`,
			description: commandsArray.join(" "),
			footer: {
				text: `${msg.client.commands.array().length} commands in ${msg.client.categories.array().length} categories`
			}
		}
	});
}
module.exports.meta = {
	name: "commands",
	aliases: ["cmd", "cmds"],
	description: "list of all commands",
	usage: "commands",
	argsRequired: false,
	category: "utility"
}