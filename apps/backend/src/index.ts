import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
  },
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

io.on('connection', (socket) => {
  socket.on('chat-message', (msg) => {
    io.emit('chat-message', msg);
  });
});

server.listen(8080, () => {
  console.log('Server listening at http://localhost:8080');
});
