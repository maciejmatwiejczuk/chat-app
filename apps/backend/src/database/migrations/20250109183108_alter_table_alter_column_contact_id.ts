import type { Kysely } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable('contact')
    .alterColumn('contact_id', (col) => col.setNotNull())
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable('contact')
    .alterColumn('contact_id', (col) => col.dropNotNull())
    .execute();
}
