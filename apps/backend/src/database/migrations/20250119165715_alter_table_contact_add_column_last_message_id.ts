import type { Kysely } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable('contact')
    .addColumn('last_message_id', 'integer', (col) =>
      col.references('message.id').onDelete('set null')
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.alterTable('contact').dropColumn('last_message_id').execute();
}
