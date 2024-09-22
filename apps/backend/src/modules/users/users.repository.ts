import { db } from '../../database/connection.js';
import type {
  UserInsert,
  UserSelect,
  UserUpdate,
} from '../../database/types.js';

export async function createUser(user: UserInsert) {
  return await db
    .insertInto('user')
    .values(user)
    .returning(['id', 'username', 'email'])
    .executeTakeFirstOrThrow();
}

export async function findUserById(id: number) {
  return await db
    .selectFrom('user')
    .where('id', '=', id)
    .select(['id', 'username', 'email'])
    .executeTakeFirst();
}

export async function findUserByUsername(username: string) {
  return await db
    .selectFrom('user')
    .where('username', '=', username)
    .select(['id', 'username', 'email'])
    .executeTakeFirst();
}

export async function findUserByEmail(email: string) {
  return await db
    .selectFrom('user')
    .where('email', '=', email)
    .select(['id', 'username', 'email'])
    .executeTakeFirst();
}

export async function findUsers(criteria: Partial<UserSelect>) {
  return await db
    .selectFrom('user')
    .select(['id', 'username', 'email'])
    .$if(Boolean(criteria.username), (q) =>
      q.where('username', '=', String(criteria.username))
    )
    .execute();
}

export async function updateUser(id: number, updateWith: UserUpdate) {
  return await db
    .updateTable('user')
    .set(updateWith)
    .where('id', '=', id)
    .returning(['id', 'username', 'email'])
    .executeTakeFirstOrThrow();
}

export async function deleteUser(id: number) {
  return await db
    .deleteFrom('user')
    .where('id', '=', id)
    .returning(['id', 'username', 'email'])
    .executeTakeFirstOrThrow();
}
