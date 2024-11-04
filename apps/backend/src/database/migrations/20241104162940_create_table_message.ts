import type { Kysely } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .createTable('message')
    .addColumn('id', 'integer', (col) =>
      col.primaryKey().generatedByDefaultAsIdentity()
    )
    .addColumn('sender_id', 'integer', (col) =>
      col.references('user.id').onDelete('set null').notNull()
    )
    .addColumn('receiver_id', 'integer', (col) =>
      col.references('user.id').onDelete('set null').notNull()
    )
    .addColumn('message', 'text', (col) => col.notNull())
    .addColumn('date', 'timestamp', (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('message').execute();
}
