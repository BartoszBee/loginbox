import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "db", "sqlite.db");

export const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password_hash TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);
