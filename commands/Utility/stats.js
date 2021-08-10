// const Discord = require("discord.js");
// const client = new Discord.Client;

// module.exports = {
//   name: 'stats',
//   description: 'stats command',
//   execute(message, logo) {
//     guildcount = client.guilds.cache.size
//     membercount = client.users.cache.size
//     channelcount = client.channels.cache.size
//     const statsembed = new Discord.MessageEmbed()
//       .setColor('#2f3136')
//       .setTitle('Bot Stats')
//       .setURL()
//       .addFields(
//         { name: 'Servers', value: guildcount, inline: true },
//         { name: 'Users', value: membercount, inline: true },
//       )
//       .setFooter('W2G | Bot by Aakash#9619', logo)

//     message.channel.send(statsembed)
//   }
// }