import { Server, Socket } from 'socket.io';
import type { ServerEvents, ClientEvents } from '@chat-app/common/types.ts';

export function registerChatEvents(
  io: Server<ClientEvents, ServerEvents>,
  socket: Socket<ClientEvents, ServerEvents>
): void {
  function onClientMessage(
    message: string,
    callback: (date: string) => void
  ): void {
    const messageDate = new Date().toISOString();

    socket.broadcast.emit('chatMessageServer', {
      message,
      date: messageDate,
    });
    callback(messageDate);
  }

  socket.on('chatMessageClient', onClientMessage);
}
