import type { NextFunction, Request, Response } from 'express';
import AppError from '../../../utils/AppError.js';
import { sessionService } from './sessions.service.js';
import { LoginSchema } from '@chat-app/_common/schemas/sessions.js';
import { io } from '../../../index.js';

export const sessionController = {
  async logIn(req: Request, res: Response, next: NextFunction) {
    try {
      const result = LoginSchema.safeParse(req.body);

      if (!result.success) {
        throw new AppError(
          'auth_failed',
          401,
          'Incorrect username or password',
          true
        );
      }

      const user = await sessionService.logIn(result.data);

      req.session.user = user;

      res.send({
        success: true,
        items: { user },
      });
    } catch (err) {
      next(err);
    }
  },
  async logOut(req: Request, res: Response) {
    io.in(String(req.session.user)).disconnectSockets();

    req.session.destroy((err) => {
      if (err) throw err;

      return res.clearCookie('sessionId').send({
        success: true,
      });
    });
  },
  async getMe(req: Request, res: Response) {
    const me = req.session.user;

    return res.send({
      success: true,
      items: { me },
    });
  },
};
