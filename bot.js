const Discord = require('discord.js');
const client = new Discord.Client();

var names = [];
var lastMessageTime = [];

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', function (channelID, message) {
	if (message.substring(0, 1) == '!') {
		var command = message.substring(1).split(' ');
		var cmd = command[0];
		command = command.splice(1);
		if(cmd == "lastMessage") {
			bot.sendMessage({
				to: channelID,
				message: message.mentions.users.first() + " last logged in at "
			});
		}
	}
});

client.login(process.env.BOT_TOKEN);
