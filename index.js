require("dotenv").config();
const { Client, Collection } = require("discord.js");
const { prefix } = require("./resources/config.json");
const { readdirSync } = require("fs");
const error = require("./functions/error");

const bot = new Client({
	fetchAllMembers: true,
	presence: {
		status: "online",
		activity: {
			name: `${prefix}help`,
			type: "LISTENING"
		}
	}
});

bot.commands = new Collection();
bot.aliases = new Collection();

const commandFiles = readdirSync("./commands").filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	bot.commands.set(command.meta.name, command);

	if (command.meta.aliases.length) {
		command.meta.aliases.forEach((alias) => {
			bot.aliases.set(alias, command);
		});
	}
}

bot.on("ready", () => {
	console.log(`${bot.user.tag} has logged in`);
});

bot.on("message", (msg) => {
	if (!msg.content.startsWith(prefix) || msg.author.bot) return;
	if (msg.channel.type !== "text") return;

	const args = msg.content.slice(prefix.length).trim().split(/ +/);
	const cmd = args.shift().toLowerCase();

	if (!bot.commands.has(cmd) && !bot.aliases.has(cmd)) return;

	try {
		const command = bot.commands.get(cmd) || bot.aliases.get(cmd);

		if (command.meta.category === "dev" && msg.author.id !== "235072703306924032") return;

    if (command.meta.category === "moderation" && !msg.member.roles.cache.find((role) => role.name === "Staff") || msg.author.id !== msg.guild.ownerID) return;

		if (command.meta.argsRequired && !args.length) {
      return error(msg, `invalid arguement\nusage: \`${prefix}${command.meta.usage}\``);
		}

		command.run(msg, args);
	}
	catch (err) {
		error(msg, "an error occured, check the console");
		console.log(err);
	}
});

bot.login(process.env.TOKEN);