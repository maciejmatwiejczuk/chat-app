import type { Socket } from 'socket.io';
import { messageController } from './messages.controller.js';
import type { ClientEvents, ServerEvents } from '@chat-app/_common';

export function registerMessageSubscribers(
  socket: Socket<ClientEvents, ServerEvents>
) {
  socket.on('chat_message:client', messageController(socket).onClientMessage);
}
