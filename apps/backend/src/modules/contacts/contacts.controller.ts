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
};
