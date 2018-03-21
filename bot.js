const Discord = require('discord.js');
var client = new Discord.Client({
   autorun: true
});

client.on('ready', () => {
	console.log('I am ready!');
});

clinet.on('message', message=> {
	if (message.content == 'ping') {
		message.reply('pong');
	}
});

client.login(process.env.BOT_TOKEN);
