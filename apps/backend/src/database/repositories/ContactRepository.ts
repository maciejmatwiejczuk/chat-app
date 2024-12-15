import type { Kysely, Transaction } from 'kysely';
import type {
  ContactInsert,
  ContactSelect,
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
        q.where('contact.username', '=', String(criteria.username))
      )
      .$if(Boolean(criteria.invitationId), (q) =>
        q.where('contact.invitationId', '=', Number(criteria.invitationId))
      )
      .orderBy('id')
      .limit(limit)
      .offset(offset)
      .execute();
  }

  transacting(trx: Transaction<Database>) {
    return new ContactRepository(trx);
  }
}
