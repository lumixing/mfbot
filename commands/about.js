const { WHITE } = require("../resources/colors.json");
const { dependencies, version } = require("../package.json");

function msToHHMMSS(ms) {
	let sec_num = parseInt(Math.floor(ms / 1000), 10);
	let hours = Math.floor(sec_num / 3600);
	let minutes = Math.floor(sec_num / 60) % 60;
	let seconds = sec_num % 60;

	return [hours, minutes, seconds]
		.map(v => v < 10 ? "0" + v : v)
		.filter((v, i) => v !== "00" || i > 0)
		.join(":");
}

module.exports.run = async (msg, args) => {
	let descriptionArray = [
		`**version**: ${version}`,
		`**discord.js version**: ${dependencies["discord.js"]}`,
		`**latency**: ${msg.client.ws.ping}ms`,
		`**uptime**: ${msToHHMMSS(msg.client.uptime)}`,
		`**ready at**: ${msg.client.readyAt.toLocaleString()}`
	];

	msg.channel.send({
		embed: {
			color: WHITE,
			author: {
				name: "about mfbot",
				icon_url: msg.client.user.avatarURL()
			},
			description: descriptionArray.join("\n")
		}
	});
}
module.exports.meta = {
	name: "about",
	aliases: ["a"],
	description: "technical information about mfbot",
	usage: "about",
	argsRequired: false,
	category: "utility"
}