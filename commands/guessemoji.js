const { emojisArray } = require("../resources/vars.json");
const { GREEN, RED } = require("../resources/colors.json");

module.exports.run = async (msg, args) => {
  const rng = Math.floor(Math.random() * emojisArray.length);
  
  msg.channel.send(`:${emojisArray[rng]}:`);

  const filter = (m) => m.author.id === msg.author.id;
  msg.channel.awaitMessages(filter, { time: 30000, max: 1 })
    .then((c) => {
      let reply = c.first().content;

      reply = reply.toLowerCase();

			for(let i = 0; i < 6; i++) {
				reply = reply.replace(" ", "_");
			}

      if (reply === emojisArray[rng]) {
        msg.channel.send({ embed: {
          color: GREEN,
          description: `**${msg.author.username}:** ${reply}\n**emojiAI:** ${emojisArray[rng]}\nPOG streak is now \`-\``,
        }})
      }
      else {
        msg.channel.send({ embed: {
          color: RED,
          description: `**${msg.author.username}:** ${reply}\n**emojiAI:** ${emojisArray[rng]}\nway to ruin the \`-\` streak`,
          }})
      }
    });
}
module.exports.meta = {
	name: "guessemoji",
	aliases: ["ge"],
	description: "guess the name of the shown emoji",
  usage: "guessemoji",
	argsRequired: false,
	category: "games"
}