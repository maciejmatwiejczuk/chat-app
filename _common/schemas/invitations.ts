import { z } from 'zod';

export const GetInvitationsSchema = z
  .object({
    senderId: z.undefined().or(z.coerce.number()),
    receiverId: z.undefined().or(z.coerce.number()),
    senderMessageCount: z.undefined().or(z.coerce.number()),
  })
  .partial();

export type GetInvitationsDto = z.infer<typeof GetInvitationsSchema>;
export type InvitationDto = { id: number } & Required<GetInvitationsDto>;
