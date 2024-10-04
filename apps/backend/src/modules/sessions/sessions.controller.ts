import type { NextFunction, Request, Response } from 'express';
import AppError from '../../utils/AppError.js';
import * as SessionService from './sessions.service.js';
import { LoginSchema } from '@chat-app/_common/schemas/sessions.js';

export async function logIn(req: Request, res: Response, next: NextFunction) {
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

    const userId = await SessionService.logIn(result.data);

    req.session.userId = userId;

    res.send({
      success: true,
      message: 'You have logged in successfully',
      data: { userId },
    });
  } catch (err) {
    next(err);
  }
}

export async function logOut(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) throw err;

    return res.clearCookie('sessionId').send({
      success: true,
      message: 'You have been log out',
    });
  });
}
