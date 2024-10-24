import expressSession from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { pool } from '../database/connection.js';
import { SESSION_SECRET } from '../constants/environment.js';

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

const pgSession = connectPgSimple(expressSession);

export const sessionConfig = {
  name: 'sessionId',
  store: new pgSession({ pool, createTableIfMissing: true }),
  secret: String(SESSION_SECRET),
  saveUninitialized: false,
  resave: false,
  rolling: true,
  cookie: {
    secure: false, // NEED TO BE TRUE ON PRODUCTION
    httpOnly: true,
    maxAge: 1000 * 60 * 10,
  },
};
