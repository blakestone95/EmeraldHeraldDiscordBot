import * as Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { ExecuteFunction } from '../types';

export const data = new SlashCommandBuilder()
  .setName('remind')
  .setDescription('Remind people about something');

export const execute: ExecuteFunction = (interaction) => {
  interaction.reply('remind success');
};
