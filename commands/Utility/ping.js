const { MessageEmbed } = require("discord.js")
require('discord-reply')

module.exports = {
    name: 'ping',
    description: "this is a ping command!",
    execute(client, message){

      let pingembed = new MessageEmbed()
      .setColor('#2f3136')
      .setTitle("Pong  :ping_pong:")
      .setDescription(`Bot Latency - **${Date.now() - message.createdTimestamp}ms**\nAPI Latency - **${Math.round(client.ws.ping)}ms**`)


        message.lineReply(pingembed);
  
    }
}