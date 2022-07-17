require('dotenv').config();
const { Client, Intents } = require('discord.js');
const mySecret = process.env['TOKEN'];  // Discord Token
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: ['USER', 'CHANNEL', 'GUILD_MEMBER', 'MESSAGE', 'REACTION']}); // Discord Object

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", message => {
	//console.log(`${message.content}: ${message.channel.type}`);
	if (message.channel.type == 'GUILD_NEWS' || message.channel.type == 'GUILD_NEWS_THREAD') {
		message.crosspost().then(() => console.log('Crossposted message')).catch(console.error);
	}
});

// Bot Login
if (!mySecret) {
  console.log("TOKEN not found! You must setup the Discord TOKEN as per the README file before running this bot.");
} else {
  client.login(mySecret);
}
