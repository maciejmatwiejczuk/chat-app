import { Socket } from 'socket.io';
import type {
  ClientEvents,
  ServerEvents,
  ChatMessageClient,
} from '@chat-app/_common/types.js';
import { messageService } from './messages.service.js';
import AppError from '../../utils/AppError.js';

export function messageController(socket: Socket<ClientEvents, ServerEvents>) {
  return {
    async onClientMessage(
      msg: ChatMessageClient,
      callback: (date: string) => void
    ) {
      try {
        const savedMessage = await messageService.onClientMessage(msg);

        socket
          .to(String(msg.receiverId))
          .emit('chat_message:server', savedMessage);
        callback(savedMessage.date);
      } catch (err) {
        if (err instanceof AppError) {
          socket.to(String(msg.senderId)).emit('error:server', {
            message: err.message,
          });
        }
      }
    },
  };
}
