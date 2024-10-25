import type { Kysely } from 'kysely';
import type { Database } from '../types.js';

export async function up(db: Kysely<Database>): Promise<void> {
  await db.schema
    .alterTable('contact')
    .addColumn('invitation_id', 'integer', (col) =>
      col.references('invitation.id').onDelete('set null')
    )
    .execute();
}

export async function down(db: Kysely<Database>): Promise<void> {
  await db.schema.alterTable('contact').dropColumn('invitation_id').execute();
}
