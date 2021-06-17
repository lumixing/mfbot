const error = require("../functions/error");

module.exports.run = async (msg, args) => {
	const serverEmojis = msg.guild.emojis.cache;
	const serverEmojisCount = serverEmojis.array().length;

	if (serverEmojisCount === 0) {
		error(msg, "this server doesnt have any emojis! :(");
		return;
	}

	const randomServerEmoji = serverEmojis.random();
	msg.channel.send(`${randomServerEmoji.animated ? "<" : "<:"}${randomServerEmoji.identifier}>`);
}
module.exports.meta = {
	name: "randomemoji",
	aliases: ["randemoji", "re"],
	description: "sends a random server emoji",
	usage: "randomemoji [code]",
	argsRequired: false,
	category: "fun"
}