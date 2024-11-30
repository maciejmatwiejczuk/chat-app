import type { Kysely, Transaction } from 'kysely';
import type { Database } from '../types.js';
import type {
  UserInsert,
  UserSelect,
  UserUpdate,
  TransactionalRepository,
} from '../types.js';

export class UserRepository implements TransactionalRepository {
  constructor(private kysely: Kysely<Database>) {}

  async create(user: UserInsert) {
    return await this.kysely
      .insertInto('user')
      .values(user)
      .returning(['id', 'username', 'email'])
      .executeTakeFirst();
  }

  async findById(id: number) {
    return await this.kysely
      .selectFrom('user')
      .where('id', '=', id)
      .select(['id', 'username', 'email'])
      .executeTakeFirst();
  }

  async findByUsername(username: string) {
    return await this.kysely
      .selectFrom('user')
      .where('username', '=', username)
      .select(['id', 'username', 'email', 'password'])
      .executeTakeFirst();
  }

  async findByEmail(email: string) {
    return await this.kysely
      .selectFrom('user')
      .where('email', '=', email)
      .select(['id', 'username', 'email'])
      .executeTakeFirst();
  }

  async findMany(limit: number, offset: number, criteria: Partial<UserSelect>) {
    return await this.kysely
      .selectFrom('user')
      .select(['id', 'username', 'email'])
      .$if(Boolean(criteria.username), (q) =>
        q.where('username', 'like', `%${criteria.username}%`)
      )
      .orderBy('id')
      .limit(limit)
      .offset(offset)
      .execute();
  }

  async update(id: number, update: UserUpdate) {
    return await this.kysely
      .updateTable('user')
      .set(update)
      .where('id', '=', id)
      .returning(['id', 'username', 'email'])
      .executeTakeFirst();
  }

  async delete(id: number) {
    return await this.kysely
      .deleteFrom('user')
      .where('id', '=', id)
      .returning(['id', 'username', 'email'])
      .executeTakeFirst();
  }

  transacting(trx: Transaction<Database>) {
    return new UserRepository(trx);
  }
}
