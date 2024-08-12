import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

interface TransferredChatMessage {
  message: string;
  date: string;
}

interface ClientEvents {
  chatMessageClient: (msg: string, callback: (date: string) => void) => void;
}

interface ServerEvents {
  chatMessageServer: (msg: TransferredChatMessage) => void;
}

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
  socket.on('chatMessageClient', (msg, cb) => {
    const messageDate = new Date().toISOString();
    socket.broadcast.emit('chatMessageServer', {
      message: msg,
      date: messageDate,
    });
    cb(messageDate);
  });
});

server.listen(8080, () => {
  console.log('Server listening at http://localhost:8080');
});
