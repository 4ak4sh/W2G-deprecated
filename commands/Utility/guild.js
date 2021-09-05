const Discord = require("discord.js");

module.exports = {
  name: "guild",
  description: "guild command",
  execute(message, MessageButton, logo){
    message.channel.send('https://discord.gg/cAQqKcqWkp');
  }
}