import { z } from 'zod';

export const GetContactsSchema = z.object({
  page: z.coerce.number().gt(0, 'page must be greater than 0'),
  ownerId: z.undefined().or(z.coerce.number()),
  contactId: z.undefined().or(z.coerce.number()),
  invitationId: z.undefined().or(z.coerce.number()),
  username: z.undefined().or(z.string()),
  lastMessageId: z.undefined().or(z.coerce.number()),
});

export type GetContactsDto = z.infer<typeof GetContactsSchema>;
export type ContactsCriteria = Omit<GetContactsDto, 'page'>;
export type ContactDto = {
  id: number;
  lastMessage: {
    id: number;
    senderId: number;
    receiverId: number;
    message: string;
    date: string;
  };
} & Required<Omit<ContactsCriteria, 'lastMessageId'>>;
