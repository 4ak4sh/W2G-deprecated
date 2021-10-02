
let botstats = async (Discord, client, apiping) => {

    const channel = await client.channels.fetch('893791826081902653')

    let botstatsemb = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .addFields(
            { name: 'Status', value: 'Online<:online:893774718337945620>'},
            { name: 'Guild Count', value: client.guilds.cache.size },
            { name: 'API Latency', value: `${apiping}ms` }
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