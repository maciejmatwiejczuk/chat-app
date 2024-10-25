import type { Kysely } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema.alterTable('invitation').dropColumn('is_accepted').execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable('invitation')
    .addColumn('is_accepted', 'boolean', (col) => col.notNull())
    .execute();
}
