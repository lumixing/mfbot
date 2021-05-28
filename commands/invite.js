module.exports.run = async (msg, args) => {
  msg.client.generateInvite().then((inv) => {
    msg.channel.send(inv);
  })
}
module.exports.meta = {
	name: "invite",
	aliases: ["inv"],
	description: "sends an invitation url for mfbot",
  usage: "invite",
	argsRequired: false,
	category: "utility"
}