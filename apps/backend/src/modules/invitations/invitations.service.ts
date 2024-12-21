import { db } from '../../database/db.js';
import type { GetInvitationsDto } from '@chat-app/_common/schemas/invitations.js';

export const invitationService = {
  async getMany(criteria: GetInvitationsDto) {
    return await db.invitation.findMany(criteria);
  },
};
