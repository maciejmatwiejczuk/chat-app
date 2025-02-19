import type { Kysely, Transaction } from 'kysely';
import type {
  Database,
  InvitationInsert,
  InvitationSelect,
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

  async findMany(criteria: Partial<InvitationSelect>) {
    return await this.kysely
      .selectFrom('invitation')
      .$if(Boolean(criteria.senderId), (q) =>
        q.where('senderId', '=', Number(criteria.senderId))
      )
      .$if(Boolean(criteria.receiverId), (q) =>
        q.where('receiverId', '=', Number(criteria.receiverId))
      )
      .$if(Boolean(criteria.senderMessageCount), (q) =>
        q.where('senderMessageCount', '=', Number(criteria.senderMessageCount))
      )
      .selectAll()
      .execute();
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
        senderMessageCount: eb('senderMessageCount', '+', 1),
      }))
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  transacting(trx: Transaction<Database>) {
    return new InvitationRepository(trx);
  }
}
