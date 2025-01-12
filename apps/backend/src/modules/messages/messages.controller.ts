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
        // !TODO: validate msg object
        const { data, event } = await messageService.onClientMessage(msg);

        if (event === 'invitation_sent' && data.invitation) {
          socket.emit(event, data.invitation);
        } else if (event === 'invitation_accepted') {
          socket.to(String(msg.receiverId)).emit(event);
        }

        socket
          .to(String(msg.receiverId))
          .emit('chat_message:server', data.savedMessage);
        callback(data.savedMessage.date);
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
