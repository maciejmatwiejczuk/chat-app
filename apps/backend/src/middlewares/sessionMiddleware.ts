import session from 'express-session';
import { sessionConfig } from '../config/session.js';

const sessionMiddleware = session(sessionConfig);

export default sessionMiddleware;
