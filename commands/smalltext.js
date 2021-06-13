const replaceArray = require("../functions/replaceArray");
const error = require("../functions/error");

module.exports.run = async (msg, args) => {
	const input = args.join(" ").split("");
	const before = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-".split("");
	const after = " ᵃᵇᶜᵈᵉᶠᵍʰᶦʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻᴬᴮᶜᴰᴱᶠᴳᴴᴵᴶᴷᴸᴹᴺᴼᴾᵠᴿˢᵀᵁⱽᵂˣʸᶻ¹²³⁴⁵⁶⁷⁸⁹⁰⁻".split("");

	msg.channel.send(replaceArray(input, before, after).join(""))
		.catch((err) => error(msg, `couldnt send message!`));
}
module.exports.meta = {
	name: "smalltext",
	aliases: ["small", "smalltxt", "smtxt"],
	description: "converts text to smol text",
	usage: "smalltext [text]",
	argsRequired: true,
	category: "fun"
}