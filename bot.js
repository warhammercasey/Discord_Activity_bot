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
		hasFirstDate = true;
	}
	if(message.mentions.users.first() == client.user){
		assignedChannel = message.channel;
	}
	console.log("Dates: " + newDate + oldDate + createdDate);
	console.log("Channel: " + assignedChannel);
	console.log("Guild available: " + message.guild.available);
	messageCount++;
	if(messageCount >= 20){
		messageCount = 0;
		if(newDate - oldDate >= 10000){ //86400000 = 1 day
			assignedChannel.send("Checking inactivity times...")
				.then(message => console.log(`Sent message: ${message.content}`))
				.catch(console.error);
			oldDate = newDate;
			var Guild = message.guild;
			var membersArray = Guild.members.array().slice();
			for(i = 0; i < Guild.members.array().length; i++){
				if(membersArray[i].user.lastMessage != null){
					if(newDate - membersArray[i].user.lastMessage.createdAt >= 1000000){ //1209600000 = 2 weeks
						assignedChannel.send("Inactive: " + membersArray[i].user.username + " has not sent a recorded message in over 2 weeks.")
							.then(message => console.log(`Sent message: ${message.content}`))
							.catch(console.error);
						assignedChannel.send(":regional_indicator_k: to kick")
							.then(message => console.log(`Sent message: ${message.content}`))
							.catch(console.error);
						assignedChannel.send(":regional_indicator_w: to send warning message")
							.then(message => console.log(`Sent message: ${message.content}`))
							.catch(console.error);
						assignedChannel.send(":regional_indicator_i: to ignore")
							.then(message => console.log(`Sent message: ${message.content}`))
							.catch(console.error);
						const filter = (reaction1, reaction2, reaction3) => reaction.emoji.name === ':regional_indicator_k:' && reaction.emoji.name === ':regional_indicator_w:' && reaction.emoji.name === ':regional_indicator_i:'
						message.awaitReactions(filter, { time: 15000 })
							.then(collected => console.log(`Collected ${collected.size} reactions`))
							.catch(console.error);
					}
				}else{
					assignedChannel.send("Inactivity of user " + membersArray[i].user.username + " is null. Either this person hasent spoken since the bot was last updated (Updated at " + createdDate + ") or this is a bug. If you are sure they have spoken report this to warhammercas and he'll try to fix it.")
						.then(message => console.log(`Sent message: ${message.content}`))
						.catch(console.error);
				}
			}
		}
	}
	
	if(message.content.charAt(0) == '!') {
		if(message.content.substr(1, message.content.indexOf(" ") - 1) == "lastLog"){
			if(message.mentions.users.first().lastMessage != null){
				message.reply(String(message.mentions.users.first().lastMessage.createdAt));
			}else{
				message.reply("The last message by that user dosent seem to exist. Either this person hasent spoken since the bot was last updated (Updated at " + createdDate + ") or this is a bug. If you are sure they have spoken report this to warhammercas and he'll try to fix it.");
			}
		}
	}
});

client.login(process.env.BOT_TOKEN);
