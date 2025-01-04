import { GetContactsSchema } from '@chat-app/_common/schemas/contacts.js';
import type { Request, Response, NextFunction } from 'express';
import AppError from '../../utils/AppError.js';
import mapFieldErrors from '../../utils/mapFieldErrors.js';
import { contactService } from './contacts.service.js';

export const contactController = {
  async getMany(req: Request, res: Response, next: NextFunction) {
    try {
      const zodResult = GetContactsSchema.safeParse(req.query);

      if (!zodResult.success) {
        throw new AppError(
          'bad_input',
          400,
          'Invalid parameters',
          true,
          mapFieldErrors(zodResult.error.issues)
        );
      }

      const contacts = await contactService.getMany(zodResult.data);

      res.send({
        success: true,
        items: { contacts },
      });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        throw new AppError('not_found', 404, 'Contact not found', true);
      }

      const contact = await contactService.getById(id);

      res.send({
        success: true,
        items: { contact },
      });
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        throw new AppError('not_found', 404, 'Contact not found', true);
      }

      const deletedContacts = await contactService.delete(id);

      res.send({
        success: true,
        items: { deletedContacts },
      });
    } catch (err) {
      next(err);
    }
  },
};
