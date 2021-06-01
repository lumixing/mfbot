module.exports.run = async (msg, args) => {
	msg.channel.send("mfbot is open source! https://github.com/lumixing/mfbot");
}
module.exports.meta = {
	name: "github",
	aliases: ["git", "gh"],
	description: "shows the github repo for mfbot",
	usage: "github",
	argsRequired: false,
	category: "utility"
}