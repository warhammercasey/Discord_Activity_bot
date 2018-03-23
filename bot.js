const Discord = require('discord.js');
const client = new Discord.Client();

var createdDate = new Date();
var hasFirstDate = false;
var assignedChannel;

var guildMembers = [];
var guildUsers = [];
var userMessageTimes = [];
var totalMessages = [];

var voiceChannelJoin = [];
var totalVCTime = [];

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
		totalMessages = [guildUsers.length];
		voiceChannelJoin = [guildUsers.length];
		totalVCTime = [guildUsers.length];
	}
	if(message.mentions.users.first() == client.user){
		assignedChannel = message.channel;
	}
	
	
	if(totalMessages[guildUsers.indexOf(message.author)] == null){
		totalMessages[guildUsers.indexOf(message.author)] = 1;
	}else{
		totalMessages[guildUsers.indexOf(message.author)]++;
	}
	
	
	if(message.content.charAt(0) == '!') {
		if(message.content.substr(1, message.content.indexOf(" ") - 1) == "lastLog"){
			if(message.mentions.users.first().lastMessage != null){
				message.reply(String(message.mentions.users.first().lastMessage.createdAt));
			}else{
				message.reply("The last message by that user dosent seem to exist. Either this person hasent spoken since the bot was last updated (Updated at " + createdDate + ") or this is a bug. If you are sure they have spoken report this to warhammercas and he'll try to fix it.");
			}
		}
		if(message.content.substr(1, message.content.indexOf(" ") - 1) == "totalMessages"){
			// to get string between * and * -- var messageContent = message.content.substr(message.content.indexOf('*') + 1, message.content.indexOf('*', message.content.indexOf('*') + 1) - 1).slice(0, -1);
			if(totalMessages[guildUsers.indexOf(message.mentions.users.first())] != null){
				message.reply(message.mentions.users.first().username + " has sent " + totalMessages[guildUsers.indexOf(message.mentions.users.first())] + " messages since this bot was last updated (last updated at " + createdDate + ").");
			}else{
				message.reply(message.mentions.users.first().username + " hasent sent any messages since the bot was last updated. (last updated at " + createdDate + ").");
			}
		}
	}
	console.log("Channel: " + assignedChannel);
	console.log(message.author.username + " has sent " + totalMessages[guildUsers.indexOf(message.author)] + " in this server.");
});

client.on('guildMemberAdd', member => {
	guildUsers.push(member.user);
	totalMessages = [guildUsers.length];
	console.log("Added user: " + member.user);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
	if(oldMember.voiceChannel == null && newMember.voiceChannel != null){
		voiceChannelJoin[guildUsers.indexOf(newMember.user)] = new Date().getTime();
		console.log(newMember.user.username + " has joined a voice channel.");
	}else if(oldMember.voiceChannel != null && newMember.voiceChannel == null){
		totalVCTime[guildUsers.indexOf(newMember.user)] += new Date().getTime() - voiceChannelJoin[guildUsers.indexOf(newMember.user)];
		console.log(newMember.user.username + " has spent " + new Date().getTime() - voiceChannelJoin[guildUsers.indexOf(newMember.user)] + "ms in voice chat.");
	}
});

client.login(process.env.BOT_TOKEN);
