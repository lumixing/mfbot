const error = require("../functions/error");

module.exports.run = async (msg, args) => {
	try {
		let result = eval(args.join(" "));
		console.log(result);
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