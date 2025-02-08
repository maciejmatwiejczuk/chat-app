import { GetChatSchema } from '@chat-app/_common/schemas/messages.js';
import type { Request, Response, NextFunction } from 'express';
import mapFieldErrors from '../../../utils/mapFieldErrors.js';
import AppError from '../../../utils/AppError.js';
import { messageService } from './messages.service.js';

export const messageController = {
  async getChat(req: Request, res: Response, next: NextFunction) {
    try {
      const zodResult = GetChatSchema.safeParse(req.query);

      if (!zodResult.success) {
        throw new AppError(
          'bad_input',
          400,
          'Invalid parameters',
          true,
          mapFieldErrors(zodResult.error.issues)
        );
      }

      const messages = await messageService.getChat(zodResult.data);

      res.send({
        success: true,
        items: { messages },
      });
    } catch (err) {
      next(err);
    }
  },
};
