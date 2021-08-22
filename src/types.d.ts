import * as Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

declare interface DiscordCommandExport {
  data: SlashCommandBuilder;
  execute: ExecuteFunction;
}

declare type ExecuteFunction = (interaction: Discord.CommandInteraction) => void;
