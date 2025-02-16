import type { Kysely } from 'kysely';
import type { Database } from '../types.js';
import type { UserInsert, UserSelect, UserUpdate } from '../types.js';

export function makeUserRepository(kysely: Kysely<Database>) {
  return {
    async create(user: UserInsert) {
      return await kysely
        .insertInto('user')
        .values(user)
        .returning(['id', 'username', 'email'])
        .executeTakeFirst();
    },
    async findById(id: number) {
      return await kysely
        .selectFrom('user')
        .where('id', '=', id)
        .select(['id', 'username', 'email'])
        .executeTakeFirst();
    },
    async findByUsername(username: string) {
      return await kysely
        .selectFrom('user')
        .where('username', '=', username)
        .select(['id', 'username', 'email', 'password'])
        .executeTakeFirst();
    },
    async findByEmail(email: string) {
      return await kysely
        .selectFrom('user')
        .where('email', '=', email)
        .select(['id', 'username', 'email'])
        .executeTakeFirst();
    },
    async findMany(
      limit: number,
      offset: number,
      criteria: Partial<UserSelect>
    ) {
      return await kysely
        .selectFrom('user')
        .select(['id', 'username', 'email'])
        .$if(Boolean(criteria.username), (q) =>
          q.where('username', 'like', `%${criteria.username}%`)
        )
        .$if(Boolean(criteria.email), (q) =>
          q.where('email', 'like', `%${criteria.email}%`)
        )
        .orderBy('id')
        .limit(limit)
        .offset(offset)
        .execute();
    },
    async update(id: number, update: UserUpdate) {
      return await kysely
        .updateTable('user')
        .set(update)
        .where('id', '=', id)
        .returning(['id', 'username', 'email'])
        .executeTakeFirst();
    },
    async delete(id: number) {
      return await kysely
        .deleteFrom('user')
        .where('id', '=', id)
        .returning(['id', 'username', 'email'])
        .executeTakeFirst();
    },
  };
}
