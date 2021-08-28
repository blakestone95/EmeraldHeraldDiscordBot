import fs from 'fs';
import path from 'path';
import * as Discord from 'discord.js';
import { DiscordCommandExport } from './types';
import { connectToLocalDb } from './db-utils';

// Initialize environment variables, database, and discord client
require('dotenv').config();
const db = connectToLocalDb();
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

// Get commands from files
const commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync(path.resolve(__dirname, './commands'))
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`) as DiscordCommandExport;
  commands.set(command.data.name, command);
}

// NOTE: Bot only responds to things after "ready"
client.once('ready', () => {
  console.log('Bearer of the code, I await your commands.');
});

// Respond to registered commands
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName) as DiscordCommandExport;

  if (!command) return;

  try {
    await command.execute(interaction, db);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: 'There was an error while executing this command',
      ephemeral: true,
    });
  }
});

// Authenticate bot using the token from https://discord.com/developers/applications
client.login(process.env.DISCORD_TOKEN);
