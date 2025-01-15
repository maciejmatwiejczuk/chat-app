import type { GetContactsDto } from '@chat-app/_common/schemas/contacts.js';
import { db } from '../../../database/db.js';
import AppError from '../../../utils/AppError.js';

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

  async delete(id: number) {
    const { ownerId: user1, contactId: user2 } = await this.getById(id);
    const twin = (
      await this.getMany({ page: 1, ownerId: user2, contactId: user1 })
    )[0];

    if (!twin) {
      throw new AppError('not_found', 404, 'Twin contact not found', true);
    }

    const deletedContacts = db.transaction(async (trx) => {
      const contact1 = await db.contact.transacting(trx).delete(id);
      const contact2 = await db.contact.transacting(trx).delete(twin.id);

      return [contact1, contact2];
    });

    return deletedContacts;
  },
};
