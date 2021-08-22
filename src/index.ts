import fs from 'fs';
import path from 'path';
import * as Discord from 'discord.js';
import Database from 'better-sqlite3';
import { DiscordCommandExport } from './types';

// Initialize environment variables, database, and discord client
require('dotenv').config();
// TODO: only verbose in dev mode
const DB_PATH = path.resolve(__dirname, './db');
const DB_FILE = DB_PATH + '/emeraldherald.db';
if (!fs.existsSync(DB_PATH)) fs.mkdirSync(DB_PATH);
const db = new Database(DB_FILE, { verbose: console.log });
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
  console.log('I am ready!');
});

// Respond to registered commands
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName) as DiscordCommandExport;

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

// Authenticate bot using the token from https://discord.com/developers/applications
client.login(process.env.DISCORD_TOKEN);

// Ensure DB is closed after exit: https://github.com/JoshuaWise/better-sqlite3/blob/HEAD/docs/api.md#close---this
process.on('exit', () => db.close());
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));
