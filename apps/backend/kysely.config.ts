import { defineConfig, getKnexTimestampPrefix } from 'kysely-ctl';
import { dialect } from './src/database/db.js';

export default defineConfig({
  dialect,
  migrations: {
    migrationFolder: 'src/database/migrations',
    getMigrationPrefix: getKnexTimestampPrefix,
  },
});
