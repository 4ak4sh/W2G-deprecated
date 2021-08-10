const Discord = require("discord.js");
const fetch = require("node-fetch")


module.exports = {
  name: "hug",
  description: "hug gif command",
  execute: async(message) =>{
    let user;
    if (message.mentions.members.first()) user = message.mentions.members.first().user.username;
    else user = 'themselves'

    const { url } = await fetch(`https://nekos.life/api/v2/img/hug`).then(response => response.json());

    let hugembed = new Discord.MessageEmbed()
      .setColor("#2f3631")
      .setAuthor(`Aww, ${message.author.username} hugs ${user}.`, message.author.displayAvatarURL({dynamic: true}))
      .setImage(url)
      .setTimestamp();
    message.channel.send( hugembed );


  }

}