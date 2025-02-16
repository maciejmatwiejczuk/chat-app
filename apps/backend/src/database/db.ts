import pg from 'pg';
import { databaseConfig } from '../config/database.js';
import { CamelCasePlugin, Transaction } from 'kysely';
import { Kysely, PostgresDialect } from 'kysely';
import type { Database } from './types.js';
import { makeContactRepository } from './repositories/contactRepository.js';
import { makeTransactionalRepository } from './repositories/transactionalRepository.js';
import { makeUserRepository } from './repositories/userRepository.js';
import { makeInvitationRepository } from './repositories/invitationRepository.js';
import { makeMessageRepository } from './repositories/messageRepository.js';

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
  plugins: [new CamelCasePlugin()],
});

export const db = {
  user: makeTransactionalRepository(makeUserRepository, kysely),
  contact: makeTransactionalRepository(makeContactRepository, kysely),
  invitation: makeTransactionalRepository(makeInvitationRepository, kysely),
  message: makeTransactionalRepository(makeMessageRepository, kysely),

  async transaction<T>(callback: (trx: Transaction<Database>) => Promise<T>) {
    return await kysely.transaction().execute(async (trx) => {
      return await callback(trx);
    });
  },
};
