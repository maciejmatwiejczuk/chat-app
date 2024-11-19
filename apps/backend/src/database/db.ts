import pg from 'pg';
import { databaseConfig } from '../config/database.js';
import { Transaction } from 'kysely';
import { Kysely, PostgresDialect } from 'kysely';
import type { Database } from './types.js';
import { UserRepository } from './repositories/UserRepository.js';
import { InvitationRepository } from './repositories/InvitationRepository.js';
import { ContactRepository } from './repositories/ContactRepository.js';
import { MessageRepository } from './repositories/MessageRepository.js';

const { Pool } = pg;

export const pool = new Pool({
  database: databaseConfig.name,
  host: databaseConfig.host,
  user: databaseConfig.user,
  password: databaseConfig.password,
  port: databaseConfig.port,
  max: databaseConfig.maxConnections,
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
  message: new MessageRepository(kysely),

  async transaction<T>(callback: (trx: Transaction<Database>) => Promise<T>) {
    return await kysely.transaction().execute(async (trx) => {
      return await callback(trx);
    });
  },
};
