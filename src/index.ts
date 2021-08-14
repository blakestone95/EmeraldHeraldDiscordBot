import * as Discord from "discord.js";

require('dotenv').config()
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on("ready", () => {
  console.log("I am ready!");
});

// Create an event listener for messages
client.on("message", (message) => {
  // If the message is "ping"
  if (message.content === "ping") {
    // Send "pong" to the same channel
    message.channel.send("pong");
  }
});

// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.DISCORD_TOKEN);
