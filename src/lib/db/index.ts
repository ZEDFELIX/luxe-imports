import path from 'path';

let db: import('better-sqlite3').Database | null = null;
let isVercel = false;

function getDb(): import('better-sqlite3').Database {
  if (isVercel) {
    throw new Error('SQLite not available on Vercel - using demo mode');
  }

  if (!db) {
    try {
      // Only import better-sqlite3 on server (not on Vercel)
      // eslint-disable-next-line @typescript-eslint/no-require-imports -- native module loaded lazily so demo mode works on Vercel
      const Database = require('better-sqlite3');
      const dbPath = path.join(process.cwd(), 'luxe-imports.db');
      const instance = new Database(dbPath);
      instance.pragma('journal_mode = WAL');
      instance.pragma('foreign_keys = ON');
      db = instance;
    } catch {
      isVercel = true;
      throw new Error('SQLite not available - using demo mode');
    }
  }
  return db!;
}

export function isDemoMode(): boolean {
  if (isVercel) return true;
  try {
    getDb();
    return false;
  } catch {
    return true;
  }
}

export default getDb;
