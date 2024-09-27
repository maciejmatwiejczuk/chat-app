import expressSession from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { pool } from '../../database/connection.js';
import { SESSION_SECRET } from '../../environment.js';

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

const pgSession = connectPgSimple(expressSession);

export const sessionConfig = {
  store: new pgSession({ pool }),
  secret: String(SESSION_SECRET),
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false, // NEED TO BE TRUE ON PRODUCTION
    httpOnly: true,
    maxAge: 1000 * 60 * 30,
  },
};
