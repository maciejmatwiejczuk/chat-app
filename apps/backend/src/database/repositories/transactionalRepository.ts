import type { Kysely, Transaction } from 'kysely';
import type { Database, RepositoryFactory } from '../types.js';

export function makeTransactionalRepository(
  makeRepo: RepositoryFactory,
  db: Kysely<Database>
) {
  return {
    ...makeRepo(db),

    transacting(trx: Transaction<Database>) {
      return makeRepo(trx);
    },
  };
}
