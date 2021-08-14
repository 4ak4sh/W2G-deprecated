const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");
const { MessageButton } = require("discord-buttons");
require('discord-buttons')(client);
const { DiscordTogether } = require('discord-together');
client.discordTogether = new DiscordTogether(client);
const dt = client.discordTogether;


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
['Actions', 'Activities', 'Utility'].forEach(e => load_dir(e));



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  client.user.setActivity("=help | =invite", { type: "STREAMING", url: "https://twitch.tv/aakash04s/about" });


});

const config = {
  prefix: "=",
  ownerid: "Aakash#5555",
  logo: "https://media.discordapp.net/attachments/819505009711513640/851822648320065606/w2g_logo.png"
}

const prefix = config.prefix;
const logo = config.logo;
const ownerid = config.ownerid;

// let logo = "https://media.discordapp.net/attachments/819505009711513640/851822648320065606/w2g_logo.png";


const helpembed = new Discord.MessageEmbed()
  .setColor('#2f3136')
  .setTitle('')
  .setDescription("Use prefix `=` before every command")
  .addFields(
    { name: "Activities", value: "`youtube` `poker` `chess`" },
    { name: "Actions", value: "Usage: =<command> <user>\n`hug` `kiss` `pat` `cuddle` `tickle` `smug`" },
    { name: "Utility", value: "`help` `prefix` `stats` `ping` `vote` `guild`" }
  )
  .setThumbnail('')
  .setAuthor('Command List for W2G', config.logo)

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


  //feed command

  if (cmd === 'feed') {
    client.commands.get('feed').execute(message)
  }

  //smug command

  if (cmd === 'smug') {
    client.commands.get("smug").execute(message)
  }

  //hug command
  if (cmd === 'hug') {
    client.commands.get("hug").execute(message)
  }

  //kiss command
  if (cmd === 'kiss') {
    client.commands.get('kiss').execute(message)
  }

  //pat command
  if (cmd === 'pat') {
    client.commands.get('pat').execute(message)
  }

  //tickle command
  if (cmd === 'tickle') {
    client.commands.get("tickle").execute(message);
  }

  //cuddle command
  if (cmd === 'cuddle') {
    client.commands.get("cuddle").execute(message);
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

});



client.login(process.env.token);