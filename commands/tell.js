const error = require("../functions/error");
const success = require("../functions/success");

module.exports.run = async (msg, args) => {
	let mentioned = msg.mentions.members.first();

	if (!mentioned) {
		return error(msg, "you didnt mention anyone!");
	}

	args.shift();

	if (!args.length) {
		return error(msg, "you didnt type the message you want to send!");
	}

	mentioned.send(args.join(" "))
		.then(() => success(msg, `successfully sent message to **${mentioned.user.tag}**`))
		.catch((err) => error(msg, `couldnt send the message!\n${String(err)}`));
}
module.exports.meta = {
	name: "tell",
	aliases: [],
	description: "send a message to someone from mfbot",
	usage: "tell [mention] [message]",
	argsRequired: true,
	category: "fun"
}