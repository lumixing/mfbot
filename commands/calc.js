const error = require("../functions/error");
const { evaluate, Unit } = require("mathjs");

module.exports.run = async (msg, args) => {
	try {
		evaluate(args.join(" "));
	}
	catch (err) {
		error(msg, `das invalid!\n\`${err}\``);
		return;
	}

	const result = evaluate(args.join(" "));

	if (result instanceof Unit) {
		msg.channel.send(result.value)
			.catch((err) => {
				console.log(result);
				error(msg, "couldnt send the message!");
				console.log(err);
			});
		return;
	}

	msg.channel.send(String(result))
		.catch((err) => {
			console.log(result);
			error(msg, "couldnt send the message!");
			console.log(err);
		});
}
module.exports.meta = {
	name: "calc",
	aliases: ["clc", "calcu", "calculate"],
	description: "calculates math",
	usage: "calc [equation]",
	argsRequired: true,
	category: "utility"
}