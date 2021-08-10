const Discord = require("discord.js");
const client = new Discord.Client;

module.exports = {
  name: "invite",
  description: "invite command",
  execute(message, MessageButton, logo) {
    const inviteembed = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setTitle('INVITE')
      .setImage("https://media.discordapp.net/attachments/819505009711513640/851831660835110922/tenor.gif")
      .setDescription('[**Click here**](https://top.gg/bot/845642988024889384) to invite W2G to your server!')

    const invitebtn = new MessageButton()
      .setStyle('url')
      .setLabel('Invite')
      .setURL('https://discord.com/api/oauth2/authorize?client_id=845642988024889384&permissions=573959745&scope=bot')

    message.channel.send(inviteembed,{
      button: invitebtn
    })
  }
}