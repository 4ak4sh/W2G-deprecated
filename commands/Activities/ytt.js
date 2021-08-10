const Discord = require('discord.js');
require('discord-reply');

module.exports = {
  name: "ytt",
  description: "Youtube Together command",
  execute(message, MessageButton, dt, logo) {
    if (!message.member.voice.channel) return message.lineReply('```Join a voice channel to use this command```');
    if (message.member.voice.channel) {
      dt.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {

        const ytembed = new Discord.MessageEmbed()
          .setColor('#2f3136')
          .setAuthor('Party Created', logo)
          .setDescription(`\n**Activity:** YouTube\n**Channel:** <#${message.member.voice.channelID}>`)
          .setTimestamp()
          .setFooter(`${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))

          const helpbtn = new MessageButton()
          .setStyle('blurple')
          .setLabel('Help')
          .setID('helpbtn')


        const ytbtn = new MessageButton()
          .setStyle('url')
          .setLabel('YouTube')
          .setEmoji("846123374526332998")
          .setURL(`${invite.code}`)


        return message.channel.send(ytembed, { buttons: [ytbtn, helpbtn] });
      });
    };
  }
}




