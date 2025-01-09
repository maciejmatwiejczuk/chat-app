import type { Kysely } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable('contact')
    .addColumn('last_message', 'text', (col) => col.notNull())
    .addColumn('last_message_sender_id', 'integer', (col) =>
      col.references('user.id').onDelete('no action').notNull()
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable('contact')
    .dropColumn('last_message')
    .dropColumn('last_message_sender_id')
    .execute();
}
