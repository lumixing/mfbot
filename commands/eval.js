const error = require("../functions/error");
const react = require("../functions/react");

module.exports.run = async (msg, args) => {
  const bot = msg.client;
  const user = msg.author;
  const member = msg.member;
  const channel = msg.channel;
  const guild = msg.guild;

	try {
		let result = await eval(args.join(" "));
    result = JSON.stringify(result, null, 2);
    msg.channel.send(result, { code: "json" })
      .catch(async (err) => {
        if (String(err).match(/Must be 2000 or fewer in length/g)) {
          react(msg, "message is over 2000 characters, send it splited?", ["✅","❌"], msg.author, 10000, (reaction) => {
            switch(reaction.emoji.name) {
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
	argsRequired: true,
	category: "dev"
}