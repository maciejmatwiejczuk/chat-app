import type { GetContactsDto } from '@chat-app/_common/schemas/contacts.js';
import { db } from '../../database/db.js';
import AppError from '../../utils/AppError.js';

export const contactService = {
  async getMany(params: GetContactsDto) {
    const PAGE_LIMIT = 10;
    const offset = PAGE_LIMIT * (params.page - 1);

    return await db.contact.findMany(PAGE_LIMIT, offset, params);
  },

  async getById(id: number) {
    const contact = await db.contact.findById(id);

    if (!contact) {
      throw new AppError('not_found', 404, 'Contact not found', true);
    }

    return contact;
  },
};
