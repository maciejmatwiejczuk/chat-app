import type { Kysely } from 'kysely';
import type { Database, MessageInsert } from '../types.js';

export function makeMessageRepository(kysely: Kysely<Database>) {
  return {
    async create(message: MessageInsert) {
      return await kysely
        .insertInto('message')
        .values(message)
        .returningAll()
        .executeTakeFirstOrThrow();
    },
    async findById(id: number) {
      return await kysely
        .selectFrom('message')
        .where('id', '=', id)
        .selectAll()
        .executeTakeFirst();
    },
    async findByChat(
      firstUserId: number,
      secondUserId: number,
      limit: number,
      offset: number
    ) {
      return await kysely
        .selectFrom('message')
        .selectAll()
        .where((eb) =>
          eb.or([
            eb.and({
              senderId: firstUserId,
              receiverId: secondUserId,
            }),
            eb.and({
              senderId: secondUserId,
              receiverId: firstUserId,
            }),
          ])
        )
        .orderBy('date', 'desc')
        .limit(limit)
        .offset(offset)
        .execute();
    },
  };
}
