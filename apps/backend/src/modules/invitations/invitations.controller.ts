import type { NextFunction, Request, Response } from 'express';
import AppError from '../../utils/AppError.js';
import { invitationService } from './invitations.service.js';
import { GetInvitationsSchema } from '@chat-app/_common/schemas/invitations.js';
import mapFieldErrors from '../../utils/mapFieldErrors.js';

export const invitationController = {
  async getMany(req: Request, res: Response, next: NextFunction) {
    try {
      const zodResult = GetInvitationsSchema.safeParse(req.query);

      console.log(zodResult.error);

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

      res.send({
        success: true,
        items: { invitations },
      });
    } catch (err) {
      next(err);
    }
  },
};
