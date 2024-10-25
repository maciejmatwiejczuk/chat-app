import type { Kysely } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('invitation')
    .addColumn('id', 'integer', (col) =>
      col.primaryKey().generatedByDefaultAsIdentity()
    )
    .addColumn('sender_id', 'integer', (col) =>
      col.references('user.id').onDelete('cascade').notNull()
    )
    .addColumn('receiver_id', 'integer', (col) =>
      col.references('user.id').onDelete('cascade').notNull()
    )
    .addColumn('is_accepted', 'boolean', (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('invitation').execute();
}
