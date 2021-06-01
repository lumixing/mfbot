module.exports.run = async (msg, args) => {
	msg.channel.send("discord permissions: https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags");
}
module.exports.meta = {
	name: "permissions",
	aliases: ["perm", "perms"],
	description: "website to discord perms incase bot gives error",
	usage: "permissions",
	argsRequired: false,
	category: "utility"
}