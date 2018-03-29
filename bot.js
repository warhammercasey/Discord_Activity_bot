const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

var fileData;

client.on('message', message => {
	console.log(message.createdAt.toString().concat("|", "text", "|", message.member.user.id.toString(), "|", message.member.user.username.toString(), "|", message.channel.id.toString(), "|", message.channel.name.toString(), "|", message.content.length));
	fs.readFile('data.txt', (err, data) => {
  		if (err) throw err;
  		console.log(data);
		fileData = data;
	});
	if(fileData == undefined){
		fs.writeFile("data.txt", message.createdAt.toString().concat("|", "text", "|", message.member.user.id.toString(), "|", message.member.user.username.toString(), "|", message.channel.id.toString(), "|", message.channel.name.toString(), "|", message.content.length), function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		});
		return;
	}
	fs.writeFile("data.txt", fileData.toString().concat(" - ", message.createdAt.toString(), "|", "text", "|", message.member.user.id.toString(), "|", message.member.user.username.toString(), "|", message.channel.id.toString(), "|", message.channel.name.toString(), "|", message.content.length), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("The file was saved!");
	}); 
	
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
	var currentTime = new Date();
	if(oldMember.voiceChannel == null && newMember.voiceChannel != null){
		console.log(currentTime.toString().concat("|", "VoiceJoin", "|", newMember.user.id.toString(), "|", newMember.user.username.toString(), "|", newMember.voiceChannel.id.toString(), "|", newMember.voiceChannel.name.toString()));
		fs.readFile('data.txt', (err, data) => {
  			if (err) throw err;
  			console.log(data);
			fileData = data;
		});
		if(fileData == undefined){
			fs.writeFile("data.txt", currentTime.toString().concat("|", "VoiceJoin", "|", newMember.user.id.toString(), "|", newMember.user.username.toString(), "|", newMember.voiceChannel.id.toString(), "|", newMember.voiceChannel.name.toString()), function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		}); 
		}
		fs.writeFile("data.txt", fileData.toString().concat(" - ", currentTime.toString(), "|", "VoiceJoin", "|", newMember.user.id.toString(), "|", newMember.user.username.toString(), "|", newMember.voiceChannel.id.toString(), "|", newMember.voiceChannel.name.toString()), function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		}); 
	}else if(oldMember.voiceChannel != null && newMember.voiceChannel == null){
		console.log(currentTime.toString().concat("|", "VoiceLeave", "|", oldMember.user.id.toString(), "|", oldMember.user.username.toString(), "|", oldMember.voiceChannel.id.toString(), "|", oldMember.voiceChannel.name.toString()));
		fs.readFile('data.txt', (err, data) => {
  			if (err) throw err;
  			console.log(data);
			fileData = data;
		});
		if(fileData == undefined){
			fs.writeFile("data.txt", currentTime.toString().concat("|", "VoiceLeave", "|", oldMember.user.id.toString(), "|", oldMember.user.username.toString(), "|", oldMember.voiceChannel.id.toString(), "|", oldMember.voiceChannel.name.toString()), function(err) {
				if(err) {
					return console.log(err);
				}
				console.log("The file was saved!");
			}); 
		}
		fs.writeFile("data.txt", fileData.toString().concat(" - ", currentTime.toString(), "|", "VoiceLeave", "|", oldMember.user.id.toString(), "|", oldMember.user.username.toString(), "|", oldMember.voiceChannel.id.toString(), "|", oldMember.voiceChannel.name.toString()), function(err) {
			if(err) {
				return console.log(err);
			}
			console.log("The file was saved!");
		}); 
	}
});

client.login(process.env.BOT_TOKEN);
