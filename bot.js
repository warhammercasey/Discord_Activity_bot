const Discord = require('discord.js');
const client = new Discord.Client();

var messageCount = 0;

var oldDate = new Date();
var newDate = new Date();
var createdDate = new Date();
var hasFirstDate = false;
var assignedChannel;

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', message => {
	newDate = message.createdAt;
	if(!hasFirstDate){
		oldDate = message.createdAt;
		createdDate = message.createdAt;
	}
	if(message.mentions.users.first() == client.user){
		assignedChannel = message.channel;
	}
	messageCount++;
	if(messageCount >= 20){
		messageCount = 0;
		if(newDate - oldDate >= 86400000){
			oldDate = newDate;
			var membersArray = Guild.members.array().slice();
			for(int i = 0; i < Guild.members.array().length; i++){
				if(membersArray[i].lastMessage
			}
		}
	}
	
	if(message.content.charAt(0) == '!') {
		if(message.content.substr(1, message.content.indexOf(" ") - 1) == "lastLog"){
			console.log(String(message.mentions));
			console.log(String(message.mentions.users));
			console.log(String(message.mentions.users.first()));
			console.log(String(message.mentions.users.first().lastMessage));
			console.log(String(message.mentions.users.first().lastMessage.createdAt));
			if(message.mentions.users.first().lastMessage != null){
				message.reply(String(message.mentions.users.first().lastMessage.createdAt));
			}else{
				message.reply("The last message by that user dosent seem to exist. Either this person hasent spoken since the bot was last updated (Updated at " + createdDate + ") or this is a bug. If you are sure they have spoken report this to warhammercas and he'll try to fix it.")
			}
		}
	}
});

client.login(process.env.BOT_TOKEN);
