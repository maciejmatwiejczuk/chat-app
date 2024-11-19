import type { Kysely, Transaction } from 'kysely';
import type {
  Database,
  MessageInsert,
  TransactionalRepository,
} from '../types.js';

export class MessageRepository implements TransactionalRepository {
  constructor(private kysely: Kysely<Database>) {}

  async create(message: MessageInsert) {
    return await this.kysely
      .insertInto('message')
      .values(message)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  transacting(trx: Transaction<Database>) {
    return new MessageRepository(trx);
  }
}
