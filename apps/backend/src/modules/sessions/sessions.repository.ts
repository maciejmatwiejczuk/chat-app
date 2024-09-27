import { db } from '../../database/connection.js';

export async function findUserByUsername(username: string) {
  return await db
    .selectFrom('user')
    .where('username', '=', username)
    .select(['id', 'username', 'email', 'password'])
    .executeTakeFirst();
}
