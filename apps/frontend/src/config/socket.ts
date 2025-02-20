import { io, Socket } from 'socket.io-client';
import type { ServerEvents, ClientEvents } from '@chat-app/_common';

export const socket: Socket<ServerEvents, ClientEvents> = io(
  'http://localhost:8080',
  {
    autoConnect: false,
    withCredentials: true,
  }
);
