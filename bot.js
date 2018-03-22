const Discord = require('discord.js');
const client = new Discord.Client();

var createdDate = new Date();
var hasFirstDate = false;
var assignedChannel;

var inactives = [];

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', message => {
	if(!hasFirstDate){
		createdDate = message.createdAt;
		hasFirstDate = true;
	}
	if(message.mentions.users.first() == client.user){
		assignedChannel = message.channel;
	}
	console.log("Channel: " + assignedChannel);
	console.log("Guild available: " + message.guild.available);
	
	if(message.content.charAt(0) == '!') {
		if(message.content.substr(1, message.content.indexOf(" ") - 1) == "lastLog"){
			if(message.mentions.users.first().lastMessage != null){
				message.reply(String(message.mentions.users.first().lastMessage.createdAt));
			}else{
				message.reply("The last message by that user dosent seem to exist. Either this person hasent spoken since the bot was last updated (Updated at " + createdDate + ") or this is a bug. If you are sure they have spoken report this to warhammercas and he'll try to fix it.");
			}
		}
		if(message.content.substr(1, message.content.indexOf(" ") - 1) == "msgsSince"){
			var messageContent = message.content.substr(message.content.indexOf('"'), message.content.indexOf('"', message.content.indexOf('"') + 1) - 1);
			console.log("Message Content: " + messageContent);
		}
	}
});

var fs = require('fs');
fs.writeFile("/tmp/test", "Hey there!", function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

client.login(process.env.BOT_TOKEN);
