import { db } from '../../database/db.js';
import type { InvitationDto } from '@chat-app/_common/schemas/invitations.js';

export const invitationService = {
  async getMany(criteria: InvitationDto) {
    return await db.invitation.findMany(criteria);
  },
};
