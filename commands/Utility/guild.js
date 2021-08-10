const Discord = require("discord.js");

module.exports = {
  name: "guild",
  description: "guild command",
  execute(message, MessageButton, logo){
    const serverembed = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setTitle("W2G'S GUILD")
      .setDescription('')
      .setImage("")
      .setAuthor("W2G", logo)
      // .setDescription('[**Click here**](https://discord.gg/Je3pHvGXbK) to join Bot support server!')

      const serverbtn = new MessageButton()
      .setStyle('url')
      .setLabel('Click to join')
      .setURL('https://discord.gg/Je3pHvGXbK')



    message.channel.send(serverembed, {
      button: serverbtn
    });
  }
}