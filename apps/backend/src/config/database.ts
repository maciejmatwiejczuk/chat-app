export const databaseConfig = {
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  name: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  maxConnections: Number(process.env.DATABASE_MAX_CONNECTIONS),
  ssl: Boolean(process.env.DATABASE_USE_SSL),
} as const;
