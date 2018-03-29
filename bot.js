const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

var createdDate = new Date();
var hasFirstDate = false;
var assignedChannel;

var guildMembers = [];
var guildUsers = [];
var userMessageTimes = [];
var messageTimeStamps = [];

var voiceChannelJoin = [];
var voiceChannelLeave = [];

var canCheckMessages = false;

var logStrings = [];

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
		canCheckMessages = false;
		assignedChannel = message.channel;
		assignedChannel.send('I have now been assigned to this channel.')
			.then(message => console.log(`Sent start message: ${message.content}`))
			.catch(console.error);
		assignedChannel.send('To change the assigned channel just mention me somewhere else.')
			.then(message => console.log(`Sent start message: ${message.content}`))
			.catch(console.error);
		assignedChannel.send('Commands (begin all with !):')
			.then(message => console.log(`Sent start message: ${message.content}`))
			.catch(console.error);
		assignedChannel.send('lastMsg <mention user> - Displays the last time that user sent a message.')
			.then(message => console.log(`Sent start message: ${message.content}`))
			.catch(console.error);
		assignedChannel.send('lastVC <mention user> - Displays the last time that user joined a voice channel.')
			.then(message => console.log(`Sent start message: ${message.content}`))
			.catch(console.error);
		assignedChannel.send('totalMessages <mention user> - Displays how many messages that user has sent.')
			.then(message => console.log(`Sent start message: ${message.content}`))
			.catch(console.error);
		assignedChannel.send('VCTime <mention user> - Displays how much time that user has spent in any voice chat.')
			.then(message => console.log(`Sent start message: ${message.content}`))
			.catch(console.error);
		assignedChannel.send('Remember that until a database is set up, the data collected is temporary, and will be reset if the bot is restarted or updated.')
			.then(message => console.log(`Sent start message: ${message.content}`))
			.catch(console.error);
		canCheckMessages = true;
	}
	if(!canCheckMessages){return;}
	
	console.log(message.createdAt.concat("|", "text", message.member.user.id.toString, "|", message.member.user.username.toString, "|", message.channel.id.toString(), "|", message.channel.toString(), "|", message.content.length));
	fs.writeFile("data.txt", message.createdAt.concat("|", "text", message.member.user.id.toString, "|", message.member.user.username.toString, "|", message.channel.id.toString(), "|", message.channel.toString(), "|", message.content.length), function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		}); 
	if(message.content.charAt(0) == '!') { //Is command
		
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
	var currentTime = new Date();
	if(oldMember.voiceChannel == null && newMember.voiceChannel != null){
		console.log(currentTime.toString().concat("|", "VoiceJoin", newMember.user.id.toString, "|", newMember.user.username.toString, "|", newMember.voiceChannel.id.toString(), "|", newMember.voiceChannel.name.toString()));
		fs.writeFile("data.txt", currentTime.toString().concat("|", "VoiceJoin", newMember.user.id.toString, "|", newMember.user.username.toString, "|", newMember.voiceChannel.id.toString(), "|", newMember.voiceChannel.name.toString()), function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		}); 
	}else if(oldMember.voiceChannel != null && newMember.voiceChannel == null){
		console.log(currentTime.toString().concat("|", "VoiceJoin", newMember.user.id.toString, "|", newMember.user.username.toString, "|", newMember.voiceChannel.id.toString(), "|", newMember.voiceChannel.name.toString()));
		fs.writeFile("data.txt", currentTime.toString().concat("|", "VoiceLeave", oldMember.user.id.toString, "|", oldMember.user.username.toString, "|", oldMember.voiceChannel.id.toString(), "|", oldMember.voiceChannel.name.toString()), function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		}); 
	}
});

client.login(process.env.BOT_TOKEN);
