import { TransferredChatMessage } from '../App';

import { io, Socket } from 'socket.io-client';

interface ClientEvents {
  chatMessageClient: (msg: string, callback: (date: string) => void) => void;
}

interface ServerEvents {
  chatMessageServer: (msg: TransferredChatMessage) => void;
}

export const socket: Socket<ServerEvents, ClientEvents> = io(
  'http://localhost:8080',
  {
    autoConnect: true,
  }
);
