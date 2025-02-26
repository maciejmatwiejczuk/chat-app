import { io, Socket } from 'socket.io-client';
import type { ServerEvents, ClientEvents } from '@chat-app/_common';

export const socket: Socket<ServerEvents, ClientEvents> = io(
  import.meta.env.VITE_API_URL,
  {
    autoConnect: false,
    withCredentials: true,
  }
);
