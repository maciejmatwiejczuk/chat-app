import type { ChatMessageClient } from '@chat-app/_common/types.js';
import { db } from '../../database/db.js';
import AppError from '../../utils/AppError.js';

export const messageService = {
  async onClientMessage(msg: ChatMessageClient) {
    const MESSAGE_LIMIT = 3;

    const contact = await db.contact.findByOwnerAndContact(
      msg.senderId,
      msg.receiverId
    );

    // contact does not exist
    if (!contact) {
      const senderUser = await db.user.findById(msg.senderId);
      const receiverUser = await db.user.findById(msg.receiverId);

      if (!senderUser) {
        throw new AppError('not_found', 404, 'Sender not found', true);
      }

      if (!receiverUser) {
        throw new AppError('not_found', 404, 'Receiver not found', true);
      }

      const savedMessage = await db.transaction(async (trx) => {
        const invitation = await db.invitation.transacting(trx).create({
          sender_id: msg.senderId,
          receiver_id: msg.receiverId,
          sender_message_count: 1,
        });
        await db.contact.transacting(trx).create({
          username: receiverUser.username,
          owner_id: msg.senderId,
          contact_id: msg.receiverId,
          invitation_id: invitation.id,
        });
        await db.contact.transacting(trx).create({
          username: senderUser.username,
          owner_id: msg.receiverId,
          contact_id: msg.senderId,
          invitation_id: invitation.id,
        });

        return await db.message.transacting(trx).create({
          sender_id: msg.senderId,
          receiver_id: msg.receiverId,
          message: msg.message,
          date: new Date().toISOString(),
        });
      });

      return savedMessage;
    }

    // contact exists and has a reference to invitation
    if (contact?.invitation_id) {
      const invitation = await db.invitation.findById(contact.invitation_id);

      if (!invitation) {
        throw new AppError('not_found', 404, 'Invitation not found', true);
      }

      const isReceiver = invitation.receiver_id === msg.receiverId;

      if (!isReceiver && invitation.sender_message_count >= MESSAGE_LIMIT) {
        throw new AppError('not_allowed', 400, 'Message limit reached', true);
      } else if (isReceiver) {
        const savedMessage = await db.transaction(async (trx) => {
          const deletedInvitation = await db.invitation.delete(invitation.id);

          if (!deletedInvitation) {
            throw new AppError('not_found', 404, 'Invitation not found', true);
          }

          return await db.message.transacting(trx).create({
            sender_id: msg.senderId,
            receiver_id: msg.receiverId,
            message: msg.message,
            date: new Date().toISOString(),
          });
        });

        return savedMessage;
      } else {
        const savedMessage = await db.transaction(async (trx) => {
          const updatedInvitation =
            await db.invitation.incrementSenderMessageCount(invitation.id);

          if (!updatedInvitation) {
            throw new AppError('not_found', 404, 'Invitation not found', true);
          }

          return await db.message.transacting(trx).create({
            sender_id: msg.senderId,
            receiver_id: msg.receiverId,
            message: msg.message,
            date: new Date().toISOString(),
          });
        });

        return savedMessage;
      }
    }

    const savedMessage = await db.message.create({
      sender_id: msg.senderId,
      receiver_id: msg.receiverId,
      message: msg.message,
      date: new Date().toISOString(),
    });

    return savedMessage;
  },
} as const;
