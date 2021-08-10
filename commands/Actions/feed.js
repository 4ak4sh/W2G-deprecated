const Discord = require("discord.js");
const fetch = require("node-fetch")


module.exports = {
  name: "feed",
  description: "feed gif command",
  execute: async(message) =>{
    let user;
    if (message.mentions.members.first()) user = message.mentions.members.first().user.username;
    else user = 'themselves'

    const { url } = await fetch(`https://nekos.life/api/v2/img/feed`).then(response => response.json());

    let feedembed = new Discord.MessageEmbed()
      .setColor("#2f3631")
      .setAuthor(` ${message.author.username} feeds ${user}.`, message.author.displayAvatarURL({dynamic:true}))
      .setImage(url)
      .setTimestamp();
    message.channel.send( feedembed );


  }
}