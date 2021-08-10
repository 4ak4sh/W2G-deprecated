const Discord = require("discord.js");
const client = new Discord.Client;



module.exports = {
  name: "vote",
  description: "vote command",
  execute(message, MessageButton, logo) {
    const voteembed = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setTitle('Vote')
      .setDescription("[Top.gg](https://top.gg/bot/845642988024889384)\n[DiscordBotList](https://discord.ly/w2g)")
      .setFooter('W2G | Bot by Aakash#5555', logo)

    const topggbtn = new MessageButton()
      .setStyle('url')
      .setLabel('Top.gg')
      .setURL('https://top.gg/bot/845642988024889384')

      const dblbtn = new MessageButton()
      .setStyle('url')
      .setLabel('DBL')
      .setURL('https://discord.ly/w2g')

    message.channel.send(voteembed, {
      buttons: [topggbtn, dblbtn]
    })
  }
}