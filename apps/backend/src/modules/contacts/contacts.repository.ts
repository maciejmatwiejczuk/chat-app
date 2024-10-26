import { db } from '../../database/connection.js';
import type { ContactInsert } from '../../database/types.js';

export async function createContact(contact: ContactInsert) {
  return await db
    .insertInto('contact')
    .values(contact)
    .executeTakeFirstOrThrow();
}

export async function findContactByOwnerAndContact(
  ownerId: number,
  contactId: number
) {
  return await db
    .selectFrom('contact')
    .where('owner_id', '=', ownerId)
    .where('contact_id', '=', contactId)
    .selectAll()
    .executeTakeFirst();
}
