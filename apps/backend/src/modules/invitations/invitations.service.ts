import { db } from '../../database/db.js';
import type { GetInvitationsDto } from '@chat-app/_common/schemas/invitations.js';
import AppError from '../../utils/AppError.js';

export const invitationService = {
  async getMany(criteria: GetInvitationsDto) {
    return await db.invitation.findMany(criteria);
  },

  async getById(id: number) {
    const invitation = await db.invitation.findById(id);

    if (!invitation) {
      throw new AppError('not_found', 404, 'Invitation not found', true);
    }

    return invitation;
  },
};
