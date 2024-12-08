import { z } from 'zod';

// TODO: make error messages work
export const GetInvitationsSchema = z
  .object({
    senderId: z
      .undefined()
      .or(
        z.coerce
          .number()
          .refine((val) => !isNaN(val), 'senderId must convert to number')
      ),
    receiverId: z.undefined().or(
      z.coerce.number().refine((val) => !isNaN(val), {
        message: 'receiverId must convert to number',
        path: ['receiverId'],
      })
    ),
    senderMessageCount: z
      .undefined()
      .or(
        z.coerce
          .number()
          .refine(
            (val) => !isNaN(val),
            'senderMessageCount must convert to number'
          )
      ),
  })
  .partial();

export type InvitationDto = z.infer<typeof GetInvitationsSchema>;
