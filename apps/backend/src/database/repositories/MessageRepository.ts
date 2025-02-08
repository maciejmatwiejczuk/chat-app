import type { Kysely, Transaction } from 'kysely';
import type {
  Database,
  MessageInsert,
  TransactionalRepository,
} from '../types.js';

export class MessageRepository implements TransactionalRepository {
  constructor(private kysely: Kysely<Database>) {}

  async create(message: MessageInsert) {
    return await this.kysely
      .insertInto('message')
      .values(message)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async findById(id: number) {
    return await this.kysely
      .selectFrom('message')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();
  }

  async findByChat(
    firstUserId: number,
    secondUserId: number,
    limit: number,
    offset: number
  ) {
    return await this.kysely
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
  }

  transacting(trx: Transaction<Database>) {
    return new MessageRepository(trx);
  }
}
