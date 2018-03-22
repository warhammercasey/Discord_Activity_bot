const Discord = require('discord.js');
const client = new Discord.Client();

var createdDate = new Date();
var hasFirstDate = false;
var assignedChannel;

var guildMembers = [];
var guildUsers = [];

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', message => {
	if(!hasFirstDate){
		createdDate = message.createdAt;
		hasFirstDate = true;
		guildMembers = [message.guild.memberCount];
		//console.log(message.guild.members);
		guildMembers = message.guild.members.array();
		for(i = 0; i < message.guild.memberCount; i++){
			guildUsers.push(guildMembers[i].user);
		}
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
			var messageContent = message.content.substr(message.content.indexOf('*') + 1, message.content.indexOf('*', message.content.indexOf('*') + 1) - 1).slice(0, -1);
			
			console.log("Message Content: " + messageContent);
		}
	}
});

client.on('guildMemberAdd', member => {
	guildUsers[guildUsers.length] = member.user;
	console.log("-------------------------------------------------------------");
	console.log(guildUsers);
});

client.login(process.env.BOT_TOKEN);
