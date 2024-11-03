import pg from 'pg';
import { database } from '../constants/environment.js';
import { Transaction } from 'kysely';
import { Kysely, PostgresDialect } from 'kysely';
import type { Database } from './types.js';
import { UserRepository } from './repositories/UserRepository.js';
import { InvitationRepository } from './repositories/InvitationRepository.js';
import { ContactRepository } from './repositories/ContactRepository.js';

const { Pool } = pg;

export const pool = new Pool({
  database: database.DATABASE_NAME,
  host: database.DATABASE_HOST,
  user: database.DATABASE_USER,
  password: database.DATABASE_PASSWORD,
  port: Number(database.DATABASE_PORT),
  max: Number(database.DATABASE_MAX_CONNECTIONS),
});

export const dialect = new PostgresDialect({
  pool,
});

const kysely = new Kysely<Database>({
  dialect,
});

export const db = {
  user: new UserRepository(kysely),
  contact: new ContactRepository(kysely),
  invitation: new InvitationRepository(kysely),

  async transaction<T>(callback: (trx: Transaction<Database>) => Promise<T>) {
    return await kysely.transaction().execute(async (trx) => {
      return await callback(trx);
    });
  },
};
