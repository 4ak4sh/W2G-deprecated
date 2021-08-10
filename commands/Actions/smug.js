const Discord = require("discord.js");
const fetch = require("node-fetch")


module.exports = {
  name: "smug",
  description: "smug gif command",
  execute: async(message) =>{
    
    const { url } = await fetch(`https://nekos.life/api/v2/img/smug`).then(response => response.json());

    let smugembed = new Discord.MessageEmbed()
      .setColor("#2f3136")
      .setAuthor(` ${message.author.username} smugs`, message.author.displayAvatarURL({dynamic:true}))
      .setImage(url)
      .setTimestamp();
    message.channel.send( smugembed );


  }
}