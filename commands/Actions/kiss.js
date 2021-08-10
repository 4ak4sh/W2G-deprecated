const Discord = require("discord.js");
const fetch = require("node-fetch")


module.exports = {
  name: "kiss",
  description: "kiss gif command",
  execute: async(message) =>{
    let user;
    if (message.mentions.members.first()) user = message.mentions.members.first().user.username;
    else user = 'themselves'

    const { url } = await fetch(`https://nekos.life/api/v2/img/kiss`).then(response => response.json());

    let kissembed = new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(` ${message.author.username} kisses ${user}.`, message.author.displayAvatarURL({dynamic:true}))
      .setImage(url)
      .setTimestamp();
    message.channel.send( kissembed );


  }
}