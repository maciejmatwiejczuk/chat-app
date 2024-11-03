import type { Kysely, Transaction } from 'kysely';
import type {
  Database,
  InvitationInsert,
  TransactionalRepository,
} from '../types.js';

export class InvitationRepository implements TransactionalRepository {
  constructor(private kysely: Kysely<Database>) {}

  async create(invitation: InvitationInsert) {
    return await this.kysely
      .insertInto('invitation')
      .values(invitation)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findById(id: number) {
    return await this.kysely
      .selectFrom('invitation')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
  }
  async delete(id: number) {
    return await this.kysely
      .deleteFrom('invitation')
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  async incrementSenderMessageCount(id: number) {
    return await this.kysely
      .updateTable('invitation')
      .set((eb) => ({
        sender_message_count: eb('sender_message_count', '+', 1),
      }))
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  transacting(trx: Transaction<Database>) {
    return new InvitationRepository(trx);
  }
}
