import AppError from '../../utils/AppError.js';
import * as InvitationRepository from './invitations.repository.js';

export async function createInvitation(senderId: number, receiverId: number) {
  const createdInvitation = await InvitationRepository.createInvitation({
    sender_id: senderId,
    receiver_id: receiverId,
    sender_message_count: 1,
  });

  return createdInvitation;
}

export async function getInvitationById(id: number) {
  const invitation = await InvitationRepository.findInvitationById(id);

  if (!invitation) {
    throw new AppError('not_found', 404, 'Invitation not found', true);
  }

  return invitation;
}

export async function deleteInvitation(id: number) {
  const deletedInvitation = await InvitationRepository.deleteInvitation(id);

  if (!deletedInvitation) {
    throw new AppError('not_found', 404, 'Invitation not found', true);
  }

  return deletedInvitation;
}
