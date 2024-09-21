import type { Kysely } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema.dropTable('user').execute();

  await db.schema
    .createTable('user')
    .addColumn('id', 'integer', (col) =>
      col.primaryKey().generatedByDefaultAsIdentity()
    )
    .addColumn('username', 'text', (col) => col.notNull().unique())
    .addColumn('password', 'text', (col) => col.notNull())
    .execute();
}
