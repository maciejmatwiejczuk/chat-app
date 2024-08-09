import { io, Socket } from 'socket.io-client';

interface SharedEvents {
  chatMessage: (msg: string) => void;
}

export const socket: Socket<SharedEvents, SharedEvents> = io(
  'http://localhost:8080',
  {
    autoConnect: true,
  }
);
