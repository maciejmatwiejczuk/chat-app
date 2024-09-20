import type { Database } from './types.js';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { database } from '../environment.js';

export const dialect = new PostgresDialect({
  pool: new Pool({
    database: database.DATABASE_NAME,
    host: database.DATABASE_HOST,
    user: database.DATABASE_USER,
    password: database.DATABASE_PASSWORD,
    port: Number(database.DATABASE_PORT),
    max: Number(database.DATABASE_MAX_CONNECTIONS),
  }),
});

export const db = new Kysely<Database>({
  dialect,
});
