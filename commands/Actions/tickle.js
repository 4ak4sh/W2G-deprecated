const Discord = require("discord.js");
const fetch = require("node-fetch")


module.exports = {
  name: "tickle",
  description: "tickle gif command",
  execute: async(message) =>{

    let user;
    if (message.mentions.members.first()) user = message.mentions.members.first().user.username;
    else user = 'themselves'

    const { url } = await fetch(`https://nekos.life/api/v2/img/tickle`).then(response => response.json());

    let tickleembed = new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(` ${message.author.username} tickles ${user}.`, message.author.displayAvatarURL({dynamic:true}))
      .setImage(url)
      .setTimestamp();
    message.channel.send( tickleembed );


  }
}