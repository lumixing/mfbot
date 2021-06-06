module.exports.run = async (msg, args) => {
	msg.channel.send("mfbot has a twitter! https://twitter.com/mfbot_");
}
module.exports.meta = {
	name: "twitter",
	aliases: ["tw"],
	description: "shows the twitter page for mfbot",
	usage: "twitter",
	argsRequired: false,
	category: "utility"
}