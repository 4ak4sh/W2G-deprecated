const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'actmenu',
    execute: async(message, MessageMenu, MessageMenuOption, logo) => {
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


        let activitiesemb = new MessageEmbed()
        .setColor('#2f3136')
        .setImage('https://media.discordapp.net/attachments/884020469383184395/884084589335830548/w2gmenubanner.png')

        message.channel.send(activitiesemb, activities)
    }
}