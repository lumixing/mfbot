const { GREEN, YELLOW, RED } = require("../resources/colors.json");

module.exports.run = async (msg, args) => {
	const ping = msg.client.ws.ping;
	let dynamicColor;

	if (ping >= 200) dynamicColor = RED;
	if (ping < 200) dynamicColor = YELLOW;
	if (ping < 100) dynamicColor = GREEN;

	msg.channel.send({ embed: {
		color: dynamicColor,
		description: `latency is **${ping}ms**`
	}});
}
module.exports.meta = {
	name: "ping",
	aliases: ["p"],
	description: "pings the bot and returns latency",
  usage: "ping",
	argsRequired: false,
	category: "utility"
}