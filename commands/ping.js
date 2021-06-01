const { GREEN, YELLOW, RED } = require("../resources/colors.json");

module.exports.run = async (msg, args) => {
	const apiLatency = msg.client.ws.ping;
	let dynamicColor;

	if (apiLatency >= 200) dynamicColor = RED;
	if (apiLatency < 200) dynamicColor = YELLOW;
	if (apiLatency < 100) dynamicColor = GREEN;

	msg.channel.send({
		embed: {
			color: dynamicColor,
			description: `**api latency**: ${apiLatency}ms`
		}
	})
		.then((m) => {
			m.edit({
				embed: {
					color: dynamicColor,
					description: `**api latency**: ${apiLatency}ms\n**response latency**: ${m.createdTimestamp - msg.createdTimestamp}ms`
				}
			})
		})
}
module.exports.meta = {
	name: "ping",
	aliases: ["p"],
	description: "pings the bot and returns latency",
	usage: "ping",
	argsRequired: false,
	category: "utility"
}