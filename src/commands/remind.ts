import * as Discord from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { ExecuteFunction } from '../types';

export const data = new SlashCommandBuilder()
  .setName('remind')
  .setDescription('Remind people about something')
  .addStringOption(option => option.setName('event_name').setDescription('Name of the event you want to remind others about'))
  .addStringOption(option => option.setName('event_desc').setDescription('Description of the event'))
  // How do we get a list of users?  Probably just need an "add user to event" command.
  .addMentionableOption(option => option.setName('participants').setDescription('User or group you want to be reminded'))
  .addStringOption(option => option.setName('date').setDescription('The date and time of the event'))
  .addStringOption(option => option.setName('remind_before').setDescription('How long ahead of time you want people to be reminded'))
  .addStringOption(option => option.setName('repeat_interval').setDescription('If the event is a repeated event, enter the interval you want it to repeat at'));

const createReminder = `
  INSERT INTO reminder (
    event_name,
    event_desc,
    participants,
    date,
    remind_before,
    repeat_interval,
    created_by
  ) VALUES (
    @event_name,
    @event_desc,
    @participants,
    @date,
    @remind_before,
    @repeat_interval,
    @created_by
  )
`;

// TODO: restrict command permissions to certain users
export const execute: ExecuteFunction = (interaction, db) => {
  interaction.reply({ content: 'Saving reminder', ephemeral: true });

  console.log(interaction.options);

  // db.prepare(createReminder);
};
