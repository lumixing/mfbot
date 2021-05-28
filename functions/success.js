const { GREEN } = require("../resources/colors.json");

module.exports = (msg, text) => {
  msg.channel.send({ embed: {
    color: GREEN,
    description: text
  }});
}