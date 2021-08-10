const { MessageEmbed } = require("discord.js")
require('discord-reply')

module.exports = {
  name: 'prefix',
  description: "this is a prefix command!",
  execute(message) {

    let prefixembed = new MessageEmbed()
      .setColor('#2f3136')
      .setTitle("")
      .setDescription('`=` is the prefix for W2G')


    message.lineReply(prefixembed);

  }
}