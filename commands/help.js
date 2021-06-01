const { WHITE } = require("../resources/colors.json");
const { prefix } = require("../resources/config.json");
const error = require("../functions/error");

module.exports.run = async (msg, args) => {
	if (!args.length) {
		let commandNamesArray = msg.client.commands.map((cmd) => "``" + cmd.meta.name + "``");

		return msg.channel.send({
			embed: {
				color: WHITE,
				title: "list of commands",
				description: `current prefix is \`${prefix}\`\n` + commandNamesArray.join(" "),
				footer: {
					text: commandNamesArray.length + " commands"
				}
			}
		});
	}

	if (!msg.client.commands.has(args[0]) && !msg.client.aliases.has(args[0])) {
		return error(msg, "this command doesnt exist");
	}

	let command = msg.client.commands.get(args[0]) || msg.client.aliases.get(args[0]);
	command = command.meta;

	let descriptionArray = [
		`**name**: ${command.name}`,
		`**aliases**: ${command.aliases.length ? command.aliases.join(", ") : "-"}`,
		`**description**: ${command.description}`,
		`**usage**: ${command.usage}`,
		`**arguements required**: ${command.argsRequired ? "yes" : "no"}`,
		`**category**: ${command.category}`
	];

	msg.channel.send({
		embed: {
			color: WHITE,
			title: prefix + command.name,
			description: descriptionArray.join("\n")
		}
	});
}
module.exports.meta = {
	name: "help",
	aliases: ["h", "hlp"],
	description: "list of commands and information about a command",
	usage: "help (command name)",
	argsRequired: false,
	category: "utility"
}