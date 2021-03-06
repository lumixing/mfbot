const error = require("../functions/error");
const react = require("../functions/react");

module.exports.run = async (msg, args) => {
	const bot = msg.client;
	const user = msg.author;
	const member = msg.member;
	const channel = msg.channel;
	const guild = msg.guild;

	try {
		let code = args.join(" ");

		if (!args.length) {
			msg.reply("waiting for code reply... type `cancel` to cancel\n\\`\\`\\`js\n\n\\`\\`\\`");

			let filter = (m) => m.author.id === msg.author.id;
			let msgs = await msg.channel.awaitMessages(filter, { max: 1 });

			code = msgs.first().content;

			if (code === "cancel") {
				return msg.reply("cancelled evaluation");
			}
		}

		code = code.replace("```js", "");
		code = code.replace("```", "");

		let result = await eval(code);

		result = JSON.stringify(result, null, 2);
		msg.channel.send(result, { code: "json" })
			.catch(async (err) => {
				if (String(err).match(/Must be 2000 or fewer in length/g)) {
					react(msg, "message is over 2000 characters, send it splited?", ["✅", "❌"], msg.author, 10000, (reaction) => {
						switch (reaction.emoji.name) {
							case "✅":
								msg.channel.send(result, { code: "json", split: true });
								break;
							case "❌":
								msg.delete().catch(() => 0);
								break;
						}
					}, (c) => {
						if (c.size === 0) msg.channel.send("didnt decide anything...")
					});
				}
			});
	}
	catch (err) {
		error(msg, `an error occured\n${String(err)}`);
		console.log(err);
	}
}
module.exports.meta = {
	name: "eval",
	aliases: ["ev"],
	description: "evaluates code",
	usage: "eval [code]",
	argsRequired: false,
	category: "dev"
}