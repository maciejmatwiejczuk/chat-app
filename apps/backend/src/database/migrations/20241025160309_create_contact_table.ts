import type { Kysely } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('contact')
    .addColumn('id', 'integer', (col) =>
      col.primaryKey().generatedByDefaultAsIdentity()
    )
    .addColumn('username', 'text', (col) =>
      col.references('user.username').onDelete('set null')
    )
    .addColumn('owner_id', 'integer', (col) =>
      col.references('user.id').onDelete('cascade')
    )
    .addColumn('contact_id', 'integer', (col) =>
      col.references('user.id').onDelete('set null')
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('contact').execute();
}
