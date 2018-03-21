const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', message => {
	if (message.content === 'ping') {
		message.reply("Id is " + this.id);
	}
});

client.login(process.env.BOT_TOKEN);
