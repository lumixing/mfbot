const error = require("../functions/error");
const e = require("../resources/emotes.json");

module.exports.run = async (msg, args) => {
	const serverEmotes = msg.guild.emojis.cache;

	if (serverEmotes.array().length <= 5) {
		error(msg, "this server needs more than 6 custom emojis");
		return;
	}

	let emotesArray = [
		e.s1,
		e.s2,
		e.s3,
		e.s4,
		e.s5,
		"\n",
		e.s6,
	];

	for (let i = 0; i < 3; i++) {
		const randomEmoji = serverEmotes.random();
		emotesArray.push(`${randomEmoji.animated ? "<" : "<:"}${randomEmoji.identifier}>`);
	}

	emotesArray = emotesArray.concat([
		e.s7,
		"\n",
		e.s8,
		e.s9,
		e.s0,
		e.sa,
		e.sb,
	]);

	msg.channel.send(emotesArray.join(""))
}
module.exports.meta = {
	name: "slot",
	aliases: ["s", "sl"],
	description: "slot a slot with server emojis!",
	usage: "slot",
	argsRequired: false,
	category: "games"
}