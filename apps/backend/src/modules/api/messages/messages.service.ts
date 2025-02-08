import type { GetChatDto } from '@chat-app/_common/schemas/messages.js';
import { db } from '../../../database/db.js';

export const messageService = {
  async getChat(params: GetChatDto) {
    const PAGE_LIMIT = 25;
    const offset = PAGE_LIMIT * (params.page - 1);

    return await db.message.findByChat(
      params.firstUserId,
      params.secondUserId,
      PAGE_LIMIT,
      offset
    );
  },
};
