import fs from 'fs';
import { DB_PATH, connectToLocalDb } from './db-utils';

// Create DB directory if not created yet (only do this in db setup script)
if (!fs.existsSync(DB_PATH)) fs.mkdirSync(DB_PATH); 
const db = connectToLocalDb(true);

// NOTE: For those unfamiliar with SQLite3, there is a built-in primary key for each table called "rowid"
//   therefore, manually adding a primary key is unnecessary in many cases
//   https://www.sqlite.org/lang_createtable.html#rowid

// Setup root DB
const createDB = `
  CREATE DATABASE 
`

// Setup reminder table
const createReminder = `
  CREATE TABLE IF NOT EXISTS reminder (
    event_name TEXT,
    event_desc TEXT,
    participants TEXT,
    date TEXT,
    remind_before INTEGER,
    repeat_interval TEXT,
    created_by TEXT,
    created_date TEXT DEFAULT CURRENT_TIMESTAMP
  )
`;
db.prepare(createReminder).run();