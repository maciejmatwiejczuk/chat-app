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
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          senderMessageCount: 1,
        });
        await db.contact.transacting(trx).create({
          username: receiverUser.username,
          ownerId: msg.senderId,
          contactId: msg.receiverId,
          invitationId: invitation.id,
        });
        await db.contact.transacting(trx).create({
          username: senderUser.username,
          ownerId: msg.receiverId,
          contactId: msg.senderId,
          invitationId: invitation.id,
        });

        return await db.message.transacting(trx).create({
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          message: msg.message,
          date: new Date().toISOString(),
        });
      });

      return savedMessage;
    }

    // contact exists and has a reference to invitation
    if (contact?.invitationId) {
      const invitation = await db.invitation.findById(contact.invitationId);

      if (!invitation) {
        throw new AppError('not_found', 404, 'Invitation not found', true);
      }

      const isReceiver = invitation.receiverId === msg.receiverId;

      if (!isReceiver && invitation.senderMessageCount >= MESSAGE_LIMIT) {
        throw new AppError('not_allowed', 400, 'Message limit reached', true);
      } else if (isReceiver) {
        const savedMessage = await db.transaction(async (trx) => {
          const deletedInvitation = await db.invitation.delete(invitation.id);

          if (!deletedInvitation) {
            throw new AppError('not_found', 404, 'Invitation not found', true);
          }

          return await db.message.transacting(trx).create({
            senderId: msg.senderId,
            receiverId: msg.receiverId,
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
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            message: msg.message,
            date: new Date().toISOString(),
          });
        });

        return savedMessage;
      }
    }

    const savedMessage = await db.message.create({
      senderId: msg.senderId,
      receiverId: msg.receiverId,
      message: msg.message,
      date: new Date().toISOString(),
    });

    return savedMessage;
  },
} as const;
