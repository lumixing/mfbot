const error = require("../functions/error");

module.exports.run = async (msg, args) => {
	const clear = console.clear();
	const line = console.log("==========================================================");

	try {
		let result = eval(args.join(" "));
		console.log(result);
		msg.react("✅");
	}
	catch (err) {
		error(msg, `an error occured\n${String(err)}`);
		console.log(err);
	}
}
module.exports.meta = {
	name: "log",
	aliases: [],
	description: "logs evaluated code in the console",
	usage: "log [code]",
	argsRequired: true,
	category: "dev"
}