import type { ChatMessageClient } from '@chat-app/_common';
import { db } from '../../../database/db.js';
import AppError from '../../../utils/AppError.js';

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

      const { savedMessage, invitation } = await db.transaction(async (trx) => {
        const invitation = await db.invitation.transacting(trx).create({
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          senderMessageCount: 1,
        });
        const savedMessage = await db.message.transacting(trx).create({
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          message: msg.message,
          date: new Date().toISOString(),
        });
        await db.contact.transacting(trx).create({
          username: receiverUser.username,
          ownerId: savedMessage.senderId,
          contactId: savedMessage.receiverId,
          invitationId: invitation.id,
          lastMessageId: savedMessage.id,
        });
        await db.contact.transacting(trx).create({
          username: senderUser.username,
          ownerId: savedMessage.receiverId,
          contactId: savedMessage.senderId,
          invitationId: invitation.id,
          lastMessageId: savedMessage.id,
        });

        return { savedMessage, invitation };
      });

      return { data: { savedMessage, invitation }, event: 'invitation_sent' };
    }

    // contact exists and has a reference to invitation
    if (contact?.invitationId) {
      const invitation = await db.invitation.findById(contact.invitationId);

      if (!invitation) {
        throw new AppError('not_found', 404, 'Invitation not found', true);
      }
      console.log('invitation object:', invitation);

      const isReceiver = invitation.receiverId === msg.senderId;

      if (!isReceiver && invitation.senderMessageCount >= MESSAGE_LIMIT) {
        throw new AppError('not_allowed', 400, 'Message limit reached', true);
      } else if (isReceiver) {
        const savedMessage = await db.transaction(async (trx) => {
          const deletedInvitation = await db.invitation
            .transacting(trx)
            .delete(invitation.id);

          if (!deletedInvitation) {
            throw new AppError('not_found', 404, 'Invitation not found', true);
          }

          const contactTwin = await db.contact
            .transacting(trx)
            .findByOwnerAndContact(msg.receiverId, msg.senderId);

          if (!contactTwin) {
            throw new AppError('not_found', 404, 'Contact not found', true);
          }

          const savedMessage = await db.message.transacting(trx).create({
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            message: msg.message,
            date: new Date().toISOString(),
          });
          await db.contact.transacting(trx).update(contact.id, {
            lastMessageId: savedMessage.id,
          });
          await db.contact.transacting(trx).update(contactTwin.id, {
            lastMessageId: savedMessage.id,
          });

          return savedMessage;
        });

        return { data: { savedMessage }, event: 'invitation_accepted' };
      } else {
        const savedMessage = await db.transaction(async (trx) => {
          const updatedInvitation = await db.invitation
            .transacting(trx)
            .incrementSenderMessageCount(invitation.id);

          if (!updatedInvitation) {
            throw new AppError('not_found', 404, 'Invitation not found', true);
          }

          const contactTwin = await db.contact
            .transacting(trx)
            .findByOwnerAndContact(msg.receiverId, msg.senderId);

          if (!contactTwin) {
            throw new AppError('not_found', 404, 'Contact not found', true);
          }

          const savedMessage = await db.message.transacting(trx).create({
            senderId: msg.senderId,
            receiverId: msg.receiverId,
            message: msg.message,
            date: new Date().toISOString(),
          });
          await db.contact.transacting(trx).update(contact.id, {
            lastMessageId: savedMessage.id,
          });
          await db.contact.transacting(trx).update(contactTwin.id, {
            lastMessageId: savedMessage.id,
          });

          return savedMessage;
        });

        return { data: { savedMessage }, event: undefined };
      }
    }

    const savedMessage = await db.transaction(async (trx) => {
      const contactTwin = await db.contact
        .transacting(trx)
        .findByOwnerAndContact(msg.receiverId, msg.senderId);

      if (!contactTwin) {
        throw new AppError('not_found', 404, 'Contact not found', true);
      }

      const savedMessage = await db.message.transacting(trx).create({
        senderId: msg.senderId,
        receiverId: msg.receiverId,
        message: msg.message,
        date: new Date().toISOString(),
      });
      await db.contact.transacting(trx).update(contact.id, {
        lastMessageId: savedMessage.id,
      });
      await db.contact.transacting(trx).update(contactTwin.id, {
        lastMessageId: savedMessage.id,
      });

      return savedMessage;
    });

    return { data: { savedMessage }, event: undefined };
  },
} as const;
