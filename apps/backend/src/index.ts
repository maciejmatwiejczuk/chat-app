import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import session from 'express-session';
import { registerChatEvents } from './events/chat.events.js';
import { server as serverConfig } from './environment.js';
import errorCatcher from './middlewares/errorCatcher.js';
import userRouter from './modules/users/users.routes.js';
import sessionRouter from './modules/sessions/sessions.routes.js';
import type { ServerEvents, ClientEvents } from '@chat-app/_common/types.ts';
import ErrorHandler from './utils/ErrorHandler.js';
import { sessionConfig } from './modules/sessions/sessions.config.js';

const app = express();

const server = createServer(app);
const io = new Server<ClientEvents, ServerEvents>(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

app.use(express.json());

app.use(session(sessionConfig));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/', sessionRouter);
app.use('/users', userRouter);

app.use(errorCatcher);

io.on('connection', (socket) => {
  registerChatEvents(io, socket);
});

process.on('uncaughtException', (error: Error) => {
  ErrorHandler.handleError(error);
  if (!ErrorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});

const HOST = serverConfig.SERVER_HOST;
const PORT = Number(serverConfig.SERVER_PORT);

server.listen(PORT, HOST, () => {
  console.log('Server listening at http://localhost:8080');
});
