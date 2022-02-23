const { Webhook, MessageBuilder } = require('discord-webhook-node');
require('dotenv').config()
const WEBHOOK_URL = process.env.WEBHOOKURL
const hook = new Webhook({
    url: 'https://discord.com/api/webhooks/943496681033453588/hsYLy3Wauo_QDaw4YeXZzOi0S5WAhPsEpgTMiMVB-Nk7vAXxQFibpLbwv7LHz76qWMin',
    avatar_url": process.env.WEBHOOK_AVATAR,
    throwErrors: true,
    retryOnLimit: false
});
hook.setUsername(`${process.env.WEBHOOK_NAME}`);
hook.setAvatar(`${process.env.WEBHOOK_AVATAR}`);

const https = require('https');

let req = https.get(`https://api.altv.mp/server/${process.env.ALTV_MASTERLISTID}`, function(res) {
	let data = '',
		json_data;

	res.on('data', function(stream) {
		data += stream;
	});
	res.on('end', function() {
		json_data = JSON.parse(data);

        if (json_data.active === true) {
            var embed = new MessageBuilder()
            .setTitle(`${json_data.info.name}`)
            .setDescription(`Status: **Online** \nUser: **${json_data.info.players} / ${json_data.info.maxPlayers}** \nIP: **${json_data.info.host}:${json_data.info.port}** \nURL: **${json_data.info.website}**`)
            .setColor(`${process.env.WEBHOOK_COLOR}`)
            .setThumbnail(`${process.env.WEBHOOK_ONLINETHUMBNAIL}`)
            .setFooter(`${process.env.WEBHOOK_FOOTERMESSAGE}`, `${process.env.WEBHOOK_FOOTERIMAGE}`)
            .setTimestamp();

            hook.send(embed);
        } else {
            var embed = new MessageBuilder()
            .setTitle(`Server - Status`)
            .setDescription(`Status: **Offline**`)
            .setColor(`${process.env.WEBHOOK_COLOR}`)
            .setThumbnail(`${process.env.WEBHOOK_OFFLINETHUMBNAIL}`)
            .setFooter(`${process.env.WEBHOOK_FOOTERMESSAGE}`, `${process.env.WEBHOOK_FOOTERIMAGE}`)
            .setTimestamp();

            hook.send(embed);
        }
        
	});
});

req.on('error', function(e) {
    console.log(e.message);
});
