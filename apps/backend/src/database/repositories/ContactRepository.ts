import type { Kysely, Transaction } from 'kysely';
import type {
  ContactInsert,
  ContactSelect,
  ContactUpdate,
  Database,
  TransactionalRepository,
} from '../types.js';

export class ContactRepository implements TransactionalRepository {
  constructor(private kysely: Kysely<Database>) {}

  async create(contact: ContactInsert) {
    return await this.kysely
      .insertInto('contact')
      .values(contact)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findById(id: number) {
    return await this.kysely
      .selectFrom('contact')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
  }

  async findByOwnerAndContact(ownerId: number, contactId: number) {
    return await this.kysely
      .selectFrom('contact')
      .where('ownerId', '=', ownerId)
      .where('contactId', '=', contactId)
      .selectAll()
      .executeTakeFirst();
  }

  async findMany(
    limit: number,
    offset: number,
    criteria: Partial<ContactSelect>
  ) {
    return await this.kysely
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
  }

  async delete(id: number) {
    return await this.kysely
      .deleteFrom('contact')
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  async update(id: number, update: ContactUpdate) {
    return await this.kysely
      .updateTable('contact')
      .set(update)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }

  transacting(trx: Transaction<Database>) {
    return new ContactRepository(trx);
  }
}
