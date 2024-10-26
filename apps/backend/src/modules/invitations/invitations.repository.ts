import { db } from '../../database/connection.js';
import type { InvitationInsert } from '../../database/types.js';

export async function createInvitation(invitation: InvitationInsert) {
  return await db
    .insertInto('invitation')
    .values(invitation)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function findInvitationById(id: number) {
  return await db
    .selectFrom('invitation')
    .where('id', '=', id)
    .selectAll()
    .executeTakeFirst();
}

export async function deleteInvitation(id: number) {
  return await db
    .deleteFrom('invitation')
    .where('id', '=', id)
    .returningAll()
    .executeTakeFirst();
}
