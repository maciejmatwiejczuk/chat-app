import type { Kysely } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  db.schema
    .alterTable('user')
    .addColumn('email', 'text', (col) => col.notNull().unique())
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  db.schema.alterTable('user').dropColumn('email').execute();
}
