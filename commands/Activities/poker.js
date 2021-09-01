const Discord = require("discord.js");
require('discord-reply');

module.exports = {
  name: "poker",
  description: "poker command",
  execute(message, MessageButton, dt, logo) {
    if (!message.member.voice.channel) return message.lineReply('```Join a voice channel to use this command```');
    if (message.member.voice.channel) {
      dt.createTogetherCode(message.member.voice.channelID, 'poker').then(async invite => {

        const pokerembed = new Discord.MessageEmbed()
           .setColor('#2f3136')
          .setAuthor('Party Created', logo)
          .setDescription(`\n**Activity:** Poker\n**Channel:** <#${message.member.voice.channelID}>`)
          .setTimestamp()
          .setFooter(`${message.author.username}`, message.author.displayAvatarURL({dynamic: true}))

        const helpbtn = new MessageButton()
          .setStyle('blurple')
          .setLabel('Help')
          .setID('helpbtn')

        const pokerbtn = new MessageButton()
          .setStyle('url')
          .setLabel('Poker')
          .setEmoji('881187635706617857')
          .setURL(`${invite.code}`);


        return message.channel.send({
          embed: pokerembed,
          buttons: [pokerbtn, helpbtn]
        });
      });
    };
  }
}