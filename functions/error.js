const { RED } = require("../resources/colors.json");

module.exports = (msg, text) => {
  msg.channel.send({ embed: {
    color: RED,
    description: text
  }}).then((m) => {
    m.delete({ timeout: 5000 }).catch((err) => 0);
    msg.delete({ timeout: 5000 }).catch((err) => 0);
  })
}