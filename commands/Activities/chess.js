const Discord = require("discord.js");
require('discord-reply')

module.exports = {
  name: "chess",
  description: "chess command",
  execute(message, MessageButton, dt, logo) {
    if (!message.member.voice.channel) return message.lineReply('```Join a voice channel to use this command```');
    if (message.member.voice.channel) {
      dt.createTogetherCode(message.member.voice.channelID, 'chess').then(async invite => {

        const chessembed = new Discord.MessageEmbed()
          .setColor('#2f3136')
          .setAuthor('Party Created', logo)
          .setDescription(`\n**Activity:** Chess\n**Channel:** <#${message.member.voice.channelID}>`)
          .setTimestamp()
          .setFooter(`${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))
          

        const helpbtn = new MessageButton()
          .setStyle('blurple')
          .setLabel('Help')
          .setID('helpbtn')

        const chessbtn = new MessageButton()
          .setStyle('url')
          .setLabel('Chess')
          .setEmoji('870434395113279589')
          .setURL(`${invite.code}`)

        return message.channel.send(chessembed, {
          buttons: [chessbtn, helpbtn]
        })
      });
    };
  }
}