import type { Kysely } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable('invitation')
    .addColumn('sender_message_count', 'integer', (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable('invitation')
    .dropColumn('sender_message_count')
    .execute();
}
