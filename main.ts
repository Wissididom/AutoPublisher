import {
  ChannelType,
  Client,
  Events,
  GatewayIntentBits,
  Partials,
} from "discord.js";

const mySecret = Deno.env.get("TOKEN"); // Discord Token
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  partials: [
    Partials.User,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.Reaction,
  ],
}); // Discord Object

client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on(Events.MessageCreate, (message) => {
  //console.log(`${message.content}: ${message.channel.type}`);
  if (
    message.channel.type == ChannelType.GuildNews ||
    message.channel.type == ChannelType.GuildNewsThread
  ) {
    message
      .crosspost()
      .then(() => console.log("Crossposted message"))
      .catch(console.error);
  }
});

// Bot Login
if (!mySecret) {
  console.log(
    "TOKEN not found! You must setup the Discord TOKEN as per the README file before running this bot.",
  );
} else {
  client.login(mySecret);
}
