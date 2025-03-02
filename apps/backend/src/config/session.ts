import expressSession from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { pool } from '../database/db.js';

declare module 'express-session' {
  interface SessionData {
    user: { id: number; username: string; email: string };
  }
}

const pgSession = connectPgSimple(expressSession);

export const sessionConfig = {
  name: 'sessionId',
  store: new pgSession({ pool, createTableIfMissing: true }),
  secret: String(process.env.SESSION_SECRET),
  saveUninitialized: false,
  resave: false,
  rolling: true,
  cookie: {
    secure: false, // NEED TO BE TRUE ON PRODUCTION
    httpOnly: true,
    maxAge: 1000 * 60 * 15,
  },
} as const;
