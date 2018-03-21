const Discord = require('discord.js');
var client = new Discord.Client({
   autorun: true
});

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', message => {
	message.reply('it got the thing, sendmessage is a little bitch.');
	client.sendMessage({
				to: channelID,
				message: "Its getting the command, message.substring does not work for some bullshit reason"
			});
	if (message.substring(0, 1) == '!') {
		var command = message.substring(1).split(' ');
		var cmd = command[0];
		command = command.splice(1);
		client.sendMessage({
				to: channelID,
				message: "At least this part is working"
			});
		if(cmd == "lastMessage") {
			client.sendMessage({
				to: channelID,
				message: "Your dumbass needs quotes or something"
			});
			client.sendMessage({
				to: channelID,
				message: message.mentions.users.first() + " last logged in at "
			});
		}
	}
});

client.login(process.env.BOT_TOKEN);
