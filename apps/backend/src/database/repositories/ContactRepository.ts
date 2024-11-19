import type { Kysely, Transaction } from 'kysely';
import type {
  ContactInsert,
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
      .where('owner_id', '=', ownerId)
      .where('contact_id', '=', contactId)
      .selectAll()
      .executeTakeFirst();
  }

  transacting(trx: Transaction<Database>) {
    return new ContactRepository(trx);
  }
}
