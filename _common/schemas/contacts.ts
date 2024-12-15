import { z } from 'zod';

export const GetContactsSchema = z.object({
  ownerId: z.undefined().or(z.coerce.number()),
  contactId: z.undefined().or(z.coerce.number()),
  invitationId: z.undefined().or(z.coerce.number()),
  username: z.undefined().or(z.string()),
  page: z.coerce.number().gt(0, 'page must be greater than 0'),
});

export type GetContactsDto = z.infer<typeof GetContactsSchema>;
export type ContactDto = Omit<GetContactsDto, 'page'>;
