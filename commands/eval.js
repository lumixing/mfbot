const error = require("../functions/error");

module.exports.run = async (msg, args) => {
	try {
		let result = eval(args.join(" "));
		if (typeof result !== "undefined") {
			msg.channel.send(result)
				.catch((err) => {});
		}
	}
	catch (err) {
    error(msg, `an error occured\n${String(err)}`);
		console.log(err);
	}
}
module.exports.meta = {
	name: "eval",
	aliases: [],
	description: "evaluates code",
  usage: "eval [code]",
	argsRequired: true,
	category: "dev"
}