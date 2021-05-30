const error = require("../functions/error");
const { WHITE } = require("../resources/colors.json");

module.exports.run = async (msg, args) => {
  let messages;

  if (!args.length) messages = 100;
  else messages = Number(args[0]);

  if (isNaN(messages) || Math.sign(messages) === -1) {
    return error(msg, "number of messages isnt a valid number");
  }

  if (messages > 100) {
    return error(msg, "number of messages must be under 100");
  }

  msg.channel.bulkDelete(messages, true).then((m) => {
    msg.channel.send({ embed: {
      color: WHITE,
      description: `deleted \`${m.size}\` messages`
    }}).then((emb) => {
      emb.delete({ timeout: 3000 }).catch((err) => 0);
    })
  })
  .catch((err) => {
    if (String(err) === "DiscordAPIError: You can only bulk delete messages that are under 14 days old.") {
      return error(msg, "tried to delete 14 days old message, try again with smaller number");
    }

    error(msg, `an error occured\n${err}`);
    console.log(err);
  })
}
module.exports.meta = {
	name: "clear",
	aliases: ["clr", "c"],
	description: "clears the messages in channel",
  usage: "clear (number of messages)",
	argsRequired: false,
	category: "moderation"
}