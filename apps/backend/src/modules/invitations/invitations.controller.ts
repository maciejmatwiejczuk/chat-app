import type { NextFunction, Request, Response } from 'express';
import AppError from '../../utils/AppError.js';
import { invitationService } from './invitations.service.js';
import { GetInvitationsSchema } from '@chat-app/_common/schemas/invitations.js';
import mapFieldErrors from '../../utils/mapFieldErrors.js';

export const invitationController = {
  async getMany(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('query:', req.query);

      const zodResult = GetInvitationsSchema.safeParse(req.query);

      if (!zodResult.success) {
        throw new AppError(
          'bad_input',
          400,
          'Invalid parameters',
          true,
          mapFieldErrors(zodResult.error.issues)
        );
      }

      const invitations = await invitationService.getMany(zodResult.data);
      console.log('invitations:', invitations);

      res.send({
        success: true,
        items: { invitations },
      });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        throw new AppError('not_found', 404, 'Invitation not found', true);
      }

      const invitation = await invitationService.getById(id);

      res.send({
        success: true,
        items: { invitation },
      });
    } catch (err) {
      next(err);
    }
  },
};
