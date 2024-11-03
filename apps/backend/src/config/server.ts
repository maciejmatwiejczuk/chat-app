export const serverConfig = {
  host: process.env.SERVER_HOST,
  port: Number(process.env.SERVER_PORT),
} as const;
