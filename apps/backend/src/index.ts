import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import 'dotenv/config';
import { registerMessagingSubscribers } from './modules/messages/messages.subscribers.js';
import { serverConfig } from './config/server.js';
import { corsConfig } from './config/cors.js';
import errorCatcher from './middlewares/errorCatcher.js';
import userRouter from './modules/users/users.routes.js';
import sessionRouter from './modules/sessions/sessions.routes.js';
import type { ServerEvents, ClientEvents } from '@chat-app/_common/types.ts';
import ErrorHandler from './utils/ErrorHandler.js';
import sessionMiddleware from './middlewares/sessionMiddleware.js';
import type { Session, SessionData } from 'express-session';

const app = express();

const server = createServer(app);
export const io: Server<ClientEvents, ServerEvents> = new Server<
  ClientEvents,
  ServerEvents
>(server, {
  cors: corsConfig,
});

app.use(express.json());

app.use(cors(corsConfig));

app.use(sessionMiddleware);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', sessionRouter);
app.use('/users', userRouter);

app.use(errorCatcher);

declare module 'http' {
  interface IncomingMessage {
    session: Session & SessionData;
  }
}

io.engine.use(sessionMiddleware);
io.on('connection', (socket) => {
  const session = socket.request.session;

  if (!session.user) {
    return;
  }

  socket.join(String(session.user.id));
  registerMessagingSubscribers(socket);
});

process.on('uncaughtException', (error: Error) => {
  ErrorHandler.handleError(error);
  if (!ErrorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});

const HOST = serverConfig.host;
const PORT = serverConfig.port;

server.listen(PORT, HOST, () => {
  console.log('Server listening at http://localhost:8080');
});
