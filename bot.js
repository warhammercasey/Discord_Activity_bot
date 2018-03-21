const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', message => {
	message.reply(String(message.toString().charAt(0)));
	if(message.content.charAt(0) == '!') {
		message.reply("Recognised '!'.");
		if(message.content.subString(1, 8) == lastLog){
			message.reply("Got message, time is: ");
			message.reply(message.mentions.users.first().lastMessage.createdAt);
		}
	}
});

client.login(process.env.BOT_TOKEN);
