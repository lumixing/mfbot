const { WHITE } = require("../resources/colors.json");
const { prefix } = require("../resources/config.json");
const error = require("../functions/error");

module.exports.run = async (msg, args) => {
	if (!args.length) {
		let descriptionArray = [];

		msg.client.categories.each((key, value) => {
			descriptionArray.push(`\`${value}\` (${key.array().length} commands)`);
		});

		return msg.channel.send({
			embed: {
				color: WHITE,
				author: {
					name: "mfbot command categories",
					icon_url: msg.client.user.avatarURL()
				},
				title: `type \`${prefix}help [category name]\` for a list of commands`,
				description: descriptionArray.join("\n"),
				footer: {
					text: `${msg.client.commands.array().length} total commands`
				}
			}
		});
	}

	let input = args[0].toLowerCase();

	if (!msg.client.commands.has(input) && !msg.client.aliases.has(input) && !msg.client.categories.has(input)) {
		return error(msg, `that command or category name doesnt exist\ntype \`${prefix}help\` for more help`);
	}

	if (msg.client.categories.has(input)) {
		let commandsArray = [];

		msg.client.categories.get(input).each((key) => {
			commandsArray.push(`\`${prefix}${key.meta.name}\``);
		});

		return msg.channel.send({
			embed: {
				color: WHITE,
				title: `list of commands in ${input}\ntype \`${prefix}help [command name]\` for more info about a command`,
				description: commandsArray.join(" "),
				footer: {
					text: `${commandsArray.length} commands`
				}
			}
		})
	}

	let command = msg.client.commands.get(input) || msg.client.aliases.get(input);
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