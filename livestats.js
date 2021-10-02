
let botstats = async (Discord, client) => {

    const channel = await client.channels.fetch('893791826081902653')

    let botstatsemb = new Discord.MessageEmbed()
        .setColor('#2f3136')
        .addFields(
            { name: 'Status', value: '<:online:893774718337945620> Online'},
            { name: 'Guild Count', value: client.guilds.cache.size },
            { name: 'Bot Latency', value: `${Math.round(client.ws.ping)}ms` }
        )

    setInterval(() => {
        channel.messages.fetch({ limit: 1 })
            .then(messages => {

                let msg = messages.first();

                    if (!msg || msg.size <= 0 || !msg.author.id === client.user.id) {
                        channel.send(botstatsemb)
                    } else if (msg.author.id === client.user.id) {
                        msg.edit(botstatsemb)
                    } else {
                        channel.send(botstatsemb)
                    }

            }).catch(e => { console.log(e) });

    }, 1000 * 30) // 30s
};


module.exports = { botstats }