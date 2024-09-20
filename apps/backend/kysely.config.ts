import { defineConfig, getKnexTimestampPrefix } from 'kysely-ctl';
import { dialect } from './src/database/connection.js';

export default defineConfig({
  dialect,
  migrations: {
    migrationFolder: 'src/database/migrations',
    getMigrationPrefix: getKnexTimestampPrefix,
  },
});
