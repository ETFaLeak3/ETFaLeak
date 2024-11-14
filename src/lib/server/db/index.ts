import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { env } from '$env/dynamic/private';
if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const sqlite = new Database(env.DATABASE_URL);
const db = drizzle(sqlite);
export {db, sqlite};