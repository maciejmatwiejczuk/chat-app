import { z } from 'zod';

export const GetChatSchema = z.object({
  page: z.coerce.number().gt(0, 'page must be greater than 0'),
  firstUserId: z.coerce.number(),
  secondUserId: z.coerce.number(),
});

export type GetChatDto = z.infer<typeof GetChatSchema>;

export interface MessageDto {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  date: string;
}
