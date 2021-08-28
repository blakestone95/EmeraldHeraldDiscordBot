import path from 'path';
import Database from 'better-sqlite3';

export const DB_PATH = path.resolve(__dirname, './db');
export const DB_FILE = DB_PATH + '/emeraldherald.db';

export function connectToLocalDb(creating: boolean = false): Database.Database {
  // TODO: only verbose in dev mode
  const db = new Database(DB_FILE, { verbose: console.log, fileMustExist: !creating });

  // Ensure DB is closed after exit: https://github.com/JoshuaWise/better-sqlite3/blob/HEAD/docs/api.md#close---this
  process.on('exit', () => db.close());
  process.on('SIGHUP', () => process.exit(128 + 1));
  process.on('SIGINT', () => process.exit(128 + 2));
  process.on('SIGTERM', () => process.exit(128 + 15));

  return db;
}
