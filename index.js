const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");
const { MessageButton, MessageMenuOption, MessageMenu } = require("discord-buttons");
require('discord-buttons')(client);
const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);
const dt = client.discordTogether;
const {botstats} = require('./livestats')

const fs = require('fs');

client.commands = new Discord.Collection();


const load_dir = (dirs) => {
  const commands_files = fs.readdirSync(`./commands/${dirs}`).filter(file => file.endsWith('.js'));
  for (const file of commands_files) {
    const command = require(`./commands/${dirs}/${file}`);
    if (command.name) {
      client.commands.set(command.name, command)

    } else {
      continue;
    }
  }
}
['Activities', 'Utility'].forEach(e => load_dir(e));



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  let apiping = Math.round(client.ws.ping);

  client.user.setActivity("=help | =invite", { type: "STREAMING", url: "https://twitch.tv/aakash04s/about" });

  botstats(Discord, client, apiping)

});

const config = {
  prefix: "=",
  ownerid: "Aakash#3238",
  logo: "https://media.discordapp.net/attachments/819505009711513640/851822648320065606/w2g_logo.png"
}

const prefix = config.prefix;
const logo = config.logo;
const ownerid = config.ownerid;

// let logo = "https://media.discordapp.net/attachments/819505009711513640/851822648320065606/w2g_logo.png";


const helpembed = new Discord.MessageEmbed()
  .setColor('#2f3136')
  .setTitle('')
  .setDescription("Usage `=activity` | `=youtube`")
  .addFields(
    {name: "Quick Menu", value: "`activities` `activity` `menu`"},
    { name: "Activities", value: "`youtube` `poker` `chess`" },
    { name: "Utility", value: "`help` `prefix` `stats` `ping` `vote` `guild`" }
  )
  .setThumbnail('')
  .setAuthor('Command List for W2G', logo)

const invitebtn = new MessageButton()
  .setStyle('url')
  .setLabel('Invite')
  .setURL('https://discord.com/api/oauth2/authorize?client_id=845642988024889384&permissions=573959745&scope=bot')

const votebtn = new MessageButton()
  .setStyle('url')
  .setLabel('Vote')
  .setURL('https://top.gg/bot/845642988024889384')


client.on('clickButton', async (button) => {
  if (button.id === 'helpbtn') {

    const ahelp = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setDescription('click the above button to start')

    button.reply.defer()
    button.channel.send({ embed: ahelp })
      .then(m => m.delete({ timeout: 10000 }))

  }

})

client.on('message', message => {

  let autodeletechannels = ['893791826081902653']

  if (autodeletechannels.includes(message.channel.id)) {
    
    if(message.author.id === client.user.id) return;

    message.delete()

  }

})


client.on('message', async (message) => {

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;


  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  //Youtube together
  if (cmd === 'youtube') {
    client.commands.get("ytt").execute(message, MessageButton, dt, logo);
  };

  //Poker Night
  if (cmd === 'poker') {
    client.commands.get("poker").execute(message, MessageButton, dt, logo)
  };

  //chess
  if (cmd === 'chess') {
    client.commands.get("chess").execute(message, MessageButton, dt, logo);
  };


  //help command
  if (cmd === 'help') {
    if (!message.channel.permissionsFor(message.guild.me).has("EMBED_LINKS")) return message.channel.send("❌ | Missing permission: `EMBED_LINKS`");
    message.channel.send(helpembed, {
      buttons: [votebtn, invitebtn]
    })
  }

  //invite command
  if (cmd === 'invite') {
    client.commands.get('invite').execute(message, MessageButton, logo)
  }

  //guild command
  if (cmd === 'guild') {
    client.commands.get('guild').execute(message, MessageButton, logo)
  }

  //vote command
  if (cmd === 'vote') {
    client.commands.get("vote").execute(message, MessageButton, logo)
  }

  //ping command
  if (cmd === 'ping') {
    client.commands.get("ping").execute(client, message);
  }

  //prefix command
  if (cmd === 'prefix') {
    client.commands.get("prefix").execute(message);
  }

  //bot stats command
  if (cmd === `stats`) {
    guildcount = client.guilds.cache.size
    membercount = client.users.cache.size
    channelcount = client.channels.cache.size
    const statsembed = new Discord.MessageEmbed()
      .setColor('#2f3136')
      .setTitle('Bot Stats')
      .setURL()
      .addFields(
        { name: 'Servers', value: guildcount, inline: true },
        { name: 'Users', value: membercount, inline: true },
      )
      .setFooter(`W2G | Bot by ${ownerid}`, logo)

    message.channel.send(statsembed)
  }

  if (cmd === 'activities' || cmd === 'activity' || cmd === 'menus' || cmd === 'menu') {
    let youtube = new MessageMenuOption()
    .setLabel('YouTube Together')
    .setDescription('Watch YouTube Together')
    .setValue('youtube')
    .setDefault()
    .setEmoji('883725363828649994')

    let poker = new MessageMenuOption()
    .setLabel('Poker Night')
    .setDescription('Play Poker Night')
    .setValue('poker')
    .setDefault()
    .setEmoji('883725341703671829')

    let chess = new MessageMenuOption()
    .setLabel('Chess in the Park')
    .setDescription('Play Chess in the Park')
    .setValue('chess')
    .setDefault()
    .setEmoji('883725312528121896')

    let activities = new MessageMenu()
    .setID('activities')
    .setMaxValues(1)
    .setMinValues(1)
    .setPlaceholder('Click here to select and start an activity')
    .addOption(youtube)
    .addOption(poker)
    .addOption(chess)


    let activitiesemb = new Discord.MessageEmbed()
    .setColor('#2f3136')
    .setImage('https://media.discordapp.net/attachments/884020469383184395/884084589335830548/w2gmenubanner.png')

    message.channel.send(activitiesemb, activities)
  }

});

const helpbtn = new MessageButton()
  .setStyle('blurple')
  .setLabel('Help')
  .setID('helpbtn')

client.on('clickMenu', async menu => {

  if (menu.values[0] === 'youtube') {
    if (!menu.clicker.member.voice.channel) {
      menu.reply.send('Join a voice channel to use this activity', true)
    } else {
      dt.createTogetherCode(menu.clicker.member.voice.channelID, 'youtube').then(async invite => {

        const ytembed = new Discord.MessageEmbed()
          .setColor('#2f3136')
          .setAuthor('Party Created', logo)
          .setDescription(`\n**Activity:** YouTube\n**Channel:** <#${menu.clicker.member.voice.channelID}>`)
          .setTimestamp()
          .setFooter(`${menu.clicker.user.username}`, menu.clicker.user.displayAvatarURL({ dynamic: true }))


        const ytbtn = new MessageButton()
          .setStyle('url')
          .setLabel('YouTube')
          .setEmoji("846123374526332998")
          .setURL(`${invite.code}`)


        return menu.reply.send(ytembed, { buttons: [ytbtn, helpbtn] });
      });
    }
  }

  if (menu.values[0] === 'poker') {
    if (!menu.clicker.member.voice.channel) { menu.reply.send('Join a voice channel to launch this activity', true) }
    else {
      dt.createTogetherCode(menu.clicker.member.voice.channelID, 'poker').then(async invite => {

        const pokerembed = new Discord.MessageEmbed()
          .setColor('#2f3136')
          .setAuthor('Party Created', logo)
          .setDescription(`\n**Activity:** Poker\n**Channel:** <#${menu.clicker.member.voice.channelID}>`)
          .setTimestamp()
          .setFooter(`${menu.clicker.user.username}`, menu.clicker.user.displayAvatarURL({ dynamic: true }))

        const pokerbtn = new MessageButton()
          .setStyle('url')
          .setLabel('Poker')
          .setEmoji('881187635706617857')
          .setURL(`${invite.code}`);


        return menu.reply.send({
          embed: pokerembed,
          buttons: [pokerbtn, helpbtn]
        });
      });
    }
  }

  if (menu.values[0] === 'chess') {
    if (!menu.clicker.member.voice.channel) {
      menu.reply.send('Join a voice channel to use this activity', true)
    } else {
      dt.createTogetherCode(menu.clicker.member.voice.channelID, 'chess').then(async invite => {

        const chessembed = new Discord.MessageEmbed()
          .setColor('#2f3136')
          .setAuthor('Party Created', logo)
          .setDescription(`\n**Activity:** Chess\n**Channel:** <#${menu.clicker.member.voice.channelID}>`)
          .setTimestamp()
          .setFooter(`${menu.clicker.user.username}`, menu.clicker.user.displayAvatarURL({ dynamic: true }))


        const chessbtn = new MessageButton()
          .setStyle('url')
          .setLabel('Chess')
          .setEmoji('870434395113279589')
          .setURL(`${invite.code}`)

        return menu.reply.send(chessembed, {
          buttons: [chessbtn, helpbtn]
        });
      });
    }
  }

});


client.login(process.env.token);