import type { Kysely } from 'kysely';
import type { Database, InvitationInsert, InvitationSelect } from '../types.js';

export function makeInvitationRepository(kysely: Kysely<Database>) {
  return {
    async create(invitation: InvitationInsert) {
      return await kysely
        .insertInto('invitation')
        .values(invitation)
        .returningAll()
        .executeTakeFirstOrThrow();
    },
    async findById(id: number) {
      return await kysely
        .selectFrom('invitation')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst();
    },
    async findMany(criteria: Partial<InvitationSelect>) {
      return await kysely
        .selectFrom('invitation')
        .$if(Boolean(criteria.senderId), (q) =>
          q.where('senderId', '=', Number(criteria.senderId))
        )
        .$if(Boolean(criteria.receiverId), (q) =>
          q.where('receiverId', '=', Number(criteria.receiverId))
        )
        .$if(Boolean(criteria.senderMessageCount), (q) =>
          q.where(
            'senderMessageCount',
            '=',
            Number(criteria.senderMessageCount)
          )
        )
        .selectAll()
        .execute();
    },
    async delete(id: number) {
      return await kysely
        .deleteFrom('invitation')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
    },
    async incrementSenderMessageCount(id: number) {
      return await kysely
        .updateTable('invitation')
        .set((eb) => ({
          senderMessageCount: eb('senderMessageCount', '+', 1),
        }))
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
    },
  };
}
