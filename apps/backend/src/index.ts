import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { registerChatEvents } from './events/chat.events.js';
import { server as serverConfig } from './environment.js';
import type { ServerEvents, ClientEvents } from '@chat-app/_common/types.ts';

const app = express();
const server = createServer(app);
const io = new Server<ClientEvents, ServerEvents>(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

io.on('connection', (socket) => {
  registerChatEvents(io, socket);
});

const HOST = serverConfig.SERVER_HOST;
const PORT = Number(serverConfig.SERVER_PORT);

server.listen(PORT, HOST, () => {
  console.log('Server listening at http://localhost:8080');
});
