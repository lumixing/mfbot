const replaceArray = require("../functions/replaceArray");
const error = require("../functions/error");

module.exports.run = async (msg, args) => {
	const input = args.join(" ").toLowerCase().split("");
	const before = " abcdefghijklmnopqrstuvwxyz1234567890!?".split("");
	const after = [
		" ",
		":regional_indicator_a:",
		":regional_indicator_b:",
		":regional_indicator_c:",
		":regional_indicator_d:",
		":regional_indicator_e:",
		":regional_indicator_f:",
		":regional_indicator_g:",
		":regional_indicator_h:",
		":regional_indicator_i:",
		":regional_indicator_j:",
		":regional_indicator_k:",
		":regional_indicator_l:",
		":regional_indicator_m:",
		":regional_indicator_n:",
		":regional_indicator_o:",
		":regional_indicator_p:",
		":regional_indicator_q:",
		":regional_indicator_r:",
		":regional_indicator_s:",
		":regional_indicator_t:",
		":regional_indicator_u:",
		":regional_indicator_v:",
		":regional_indicator_w:",
		":regional_indicator_x:",
		":regional_indicator_y:",
		":regional_indicator_z:",
		":one:",
		":two:",
		":three:",
		":four:",
		":five:",
		":six:",
		":seven:",
		":eight:",
		":nine:",
		":zero:",
		":grey_exclamation:",
		":grey_question:"
	]

	msg.channel.send(replaceArray(input, before, after).join(""))
		.catch((err) => error(msg, `couldnt send message!`));
}
module.exports.meta = {
	name: "bigtext",
	aliases: ["big", "bigtxt", "bgtxt"],
	description: "converts text to big text",
	usage: "bigtext [text]",
	argsRequired: true,
	category: "fun"
}