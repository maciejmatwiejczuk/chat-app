import { io, Socket } from 'socket.io-client';
import type { ServerEvents, ClientEvents } from '@chat-app/_common';

export const socket: Socket<ServerEvents, ClientEvents> = io(
  'https://chat-app-bhhw.onrender.com',
  {
    autoConnect: false,
    withCredentials: true,
  }
);
