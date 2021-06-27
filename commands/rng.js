const { isNegativeDependencies } = require("mathjs");
const error = require("../functions/error");

module.exports.run = async (msg, args) => {
	if (!args.length) {
		msg.channel.send(Math.random());
		return;
	}

	const min = parseInt(args[0]);
	const max = parseInt(args[1]);

	if (!args[1]) {
		error(msg, "you need to provide a max number aswell");
		return;
	}

	if (isNaN(min) || isNaN(max)) {
		error(msg, "min and max need to be integer numbers");
		return;
	}

	// random integer function
	let randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;

	msg.channel.send(randomInteger)
		.catch((err) => error(msg, `couldnt send the message\n\`${err}\``));
}
module.exports.meta = {
	name: "rng",
	aliases: ["random"],
	description: "generates a random number",
	usage: "rng (min) (max)",
	argsRequired: false,
	category: "utility"
}