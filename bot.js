const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

var disabled = false;

client.on('message', message => {
	if(message.content.charAt(0) == '!') { //Is command
		if(message.content.substr(1, message.content.indexOf(" ") - 1) == "loginBotDisable"){
			disabled = true;
			console.log("Disabled")
		}
		if(message.content.substr(1, message.content.indexOf(" ") - 1) == "loginBotEnable"){
			disabled = false;
			console.log("Enabled");
		}
	}
	if(!disabled){return;}
	console.log(message.createdAt.toString().concat("|", "text", "|", message.member.user.id.toString(), "|", message.member.user.username.toString(), "|", message.channel.id.toString(), "|", message.channel.name.toString(), "|", message.content.length));
	fs.writeFile("data.txt", message.createdAt.toString().concat("|", "text", "|", message.member.user.id.toString(), "|", message.member.user.username.toString(), "|", message.channel.id.toString(), "|", message.channel.name.toString(), "|", message.content.length), function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		}); 
	
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
	if(!disabled){return;}
	var currentTime = new Date();
	if(oldMember.voiceChannel == null && newMember.voiceChannel != null){
		console.log(currentTime.toString().concat("|", "VoiceJoin", "|", newMember.user.id.toString(), "|", newMember.user.username.toString(), "|", newMember.voiceChannel.id.toString(), "|", newMember.voiceChannel.name.toString()));
		fs.writeFile("data.txt", currentTime.toString().concat("|", "VoiceJoin", "|", newMember.user.id.toString(), "|", newMember.user.username.toString(), "|", newMember.voiceChannel.id.toString(), "|", newMember.voiceChannel.name.toString()), function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		}); 
	}else if(oldMember.voiceChannel != null && newMember.voiceChannel == null){
		console.log(currentTime.toString().concat("|", "VoiceLeave", "|", oldMember.user.id.toString(), "|", oldMember.user.username.toString(), "|", oldMember.voiceChannel.id.toString(), "|", oldMember.voiceChannel.name.toString()));
		fs.writeFile("data.txt", currentTime.toString().concat("|", "VoiceLeave", "|", oldMember.user.id.toString(), "|", oldMember.user.username.toString(), "|", oldMember.voiceChannel.id.toString(), "|", oldMember.voiceChannel.name.toString()), function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		}); 
	}
});

client.login(process.env.BOT_TOKEN);
