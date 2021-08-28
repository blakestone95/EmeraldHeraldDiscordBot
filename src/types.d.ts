import * as Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import Database from 'better-sqlite3';

declare interface DiscordCommandExport {
  data: SlashCommandBuilder;
  execute: ExecuteFunction;
}

declare type ExecuteFunction = (interaction: Discord.CommandInteraction, db: Database.Database) => void;
