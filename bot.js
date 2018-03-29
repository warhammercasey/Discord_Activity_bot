const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

var fileData;

var date;

client.on('ready', () => {
	console.log('I am ready!');
	fs.writeFile("data.txt", "", function(err) {
		if(err) {
			return console.log(err);
		}
	});
});

client.on('message', message => {
	date = (message.createdAt.getMonth() + 1).toString().concat("/", message.createdAt.getDate().toString(), "/", message.createdAt.getYear().toString().substr(1, 3), " ", message.createdAt.getUTCHours().toString(), ":", message.createdAt.getMinutes().toString(), ":", message.createdAt.getSeconds().toString());
	
	//console.log(date.toString().concat("|", "text", "|", message.member.user.id.toString(), "|", message.member.user.username.toString(), "|", message.channel.id.toString(), "|", message.channel.name.toString(), "|", message.content.length));
	fs.readFile('data.txt', (err, data) => {
  		if (err) throw err;
		fileData = data;
	});
	if(fileData == undefined){
		fs.writeFile("data.txt", date.toString().concat("|", "text", "|", message.member.user.id.toString(), "|", message.member.user.username.toString(), "|", message.channel.id.toString(), "|", message.channel.name.toString(), "|", message.content.length) + "\r\n", function(err) {
			if(err) {
				return console.log(err);
			}
		});
		return;
	}
	//console.log(fileData.toString());
	fs.writeFile("data.txt", fileData.toString().concat(date.toString(), "|", "text", "|", message.member.user.id.toString(), "|", message.member.user.username.toString(), "|", message.channel.id.toString(), "|", message.channel.name.toString(), "|", message.content.length) + "\r\n", function(err) {
		if(err) {
			return console.log(err);
		}
	}); 
	
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
	var currentTime = new Date();
	currentTime = (currentTime.getMonth() + 1).toString().concat("/", currentTime.getDate().toString(), "/", currentTime.getYear().toString().substr(1, 3), " ", currentTime.getUTCHours().toString(), ":", currentTime.getMinutes().toString(), ":", currentTime.getSeconds().toString());
	if(oldMember.voiceChannel == null && newMember.voiceChannel != null){
		//console.log(currentTime.toString().concat("|", "VoiceJoin", "|", newMember.user.id.toString(), "|", newMember.user.username.toString(), "|", newMember.voiceChannel.id.toString(), "|", newMember.voiceChannel.name.toString()));
		fs.readFile('data.txt', (err, data) => {
  			if (err) throw err;
			fileData = data;
		});
		if(fileData == undefined){
			fs.writeFile("data.txt", currentTime.toString().concat("|", "VoiceJoin", "|", newMember.user.id.toString(), "|", newMember.user.username.toString(), "|", newMember.voiceChannel.id.toString(), "|", newMember.voiceChannel.name.toString()), function(err) {
				if(err) {
					return console.log(err);
				}
				return;
			}); 
		}
		fs.writeFile("data.txt", fileData.toString().concat(currentTime.toString(), "|", "VoiceJoin", "|", newMember.user.id.toString(), "|", newMember.user.username.toString(), "|", newMember.voiceChannel.id.toString(), "|", newMember.voiceChannel.name.toString()), function(err) {
			if(err) {
				return console.log(err);
			}
		}); 
	}else if(oldMember.voiceChannel != null && newMember.voiceChannel == null){
		//console.log(currentTime.toString().concat("|", "VoiceLeave", "|", oldMember.user.id.toString(), "|", oldMember.user.username.toString(), "|", oldMember.voiceChannel.id.toString(), "|", oldMember.voiceChannel.name.toString()));
		fs.readFile('data.txt', (err, data) => {
  			if (err) throw err;
			fileData = data;
		});
		if(fileData == undefined){
			fs.writeFile("data.txt", currentTime.toString().concat("|", "VoiceLeave", "|", oldMember.user.id.toString(), "|", oldMember.user.username.toString(), "|", oldMember.voiceChannel.id.toString(), "|", oldMember.voiceChannel.name.toString()), function(err) {
				if(err) {
					return console.log(err);
				}
				return;
			}); 
		}
		fs.writeFile("data.txt", fileData.toString().concat(currentTime.toString(), "|", "VoiceLeave", "|", oldMember.user.id.toString(), "|", oldMember.user.username.toString(), "|", oldMember.voiceChannel.id.toString(), "|", oldMember.voiceChannel.name.toString()), function(err) {
			if(err) {
				return console.log(err);
			}
		}); 
	}
	fs.readFile('data.txt', (err, data) => {
		if (err) throw err;
		console.log(data.toString());
	});
});

client.login(process.env.BOT_TOKEN);
