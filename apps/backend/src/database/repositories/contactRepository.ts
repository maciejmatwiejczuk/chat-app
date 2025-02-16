import type { Kysely } from 'kysely';
import type {
  ContactInsert,
  ContactSelect,
  ContactUpdate,
  Database,
} from '../types.js';

export function makeContactRepository(kysely: Kysely<Database>) {
  return {
    async create(contact: ContactInsert) {
      return await kysely
        .insertInto('contact')
        .values(contact)
        .returningAll()
        .executeTakeFirstOrThrow();
    },
    async findById(id: number) {
      return await kysely
        .selectFrom('contact')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst();
    },
    async findByOwnerAndContact(ownerId: number, contactId: number) {
      return await kysely
        .selectFrom('contact')
        .where('ownerId', '=', ownerId)
        .where('contactId', '=', contactId)
        .selectAll()
        .executeTakeFirst();
    },
    async findMany(
      limit: number,
      offset: number,
      criteria: Partial<ContactSelect>
    ) {
      return await kysely
        .selectFrom('contact')
        .selectAll()
        .$if(Boolean(criteria.ownerId), (q) =>
          q.where('ownerId', '=', Number(criteria.ownerId))
        )
        .$if(Boolean(criteria.contactId), (q) =>
          q.where('contact.contactId', '=', Number(criteria.contactId))
        )
        .$if(Boolean(criteria.username), (q) =>
          q.where('contact.username', 'like', `%${criteria.username}%`)
        )
        .$if(Boolean(criteria.invitationId), (q) =>
          q.where('contact.invitationId', '=', Number(criteria.invitationId))
        )
        .$if(Boolean(criteria.lastMessageId), (q) =>
          q.where('contact.lastMessageId', '=', Number(criteria.lastMessageId))
        )
        .orderBy('id')
        .limit(limit)
        .offset(offset)
        .execute();
    },
    async delete(id: number) {
      return await kysely
        .deleteFrom('contact')
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
    },
    async update(id: number, update: ContactUpdate) {
      return await kysely
        .updateTable('contact')
        .set(update)
        .where('id', '=', id)
        .returningAll()
        .executeTakeFirst();
    },
  };
}
