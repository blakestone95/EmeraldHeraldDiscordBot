import fs from 'fs';
import path from 'path';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { DiscordCommandExport } from './types';

// Initialize environment variables
require('dotenv').config();
const {
  DISCORD_TOKEN = '',
  DISCORD_CLIENT_ID = '',
  DISCORD_GUILD_ID = '',
} = process.env;

// Get commands from files
const commands: object[] = [];
const commandFiles = fs
  .readdirSync(path.resolve(__dirname, './commands'))
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`) as DiscordCommandExport;
  commands.push(command.data.toJSON());
}

// Register the commands to Discord
const rest = new REST({ version: '9' }).setToken(DISCORD_TOKEN);
async function registerCommandsToDiscord() {
  try {
    await rest.put(
      Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID),
      { body: commands }
    );

    console.log('Successfully registered application commands.');
  } catch (error) {
    console.error(error);
  }
}
registerCommandsToDiscord();
