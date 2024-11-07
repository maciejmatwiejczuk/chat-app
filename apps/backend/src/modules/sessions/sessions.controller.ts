import type { NextFunction, Request, Response } from 'express';
import AppError from '../../utils/AppError.js';
import * as SessionService from './sessions.service.js';
import { LoginSchema } from '@chat-app/_common/schemas/sessions.js';
import { io } from '../../index.js';

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

    const user = await SessionService.logIn(result.data);

    req.session.user = user;

    res.send({
      success: true,
      message: 'You have logged in successfully',
      data: { user },
    });
  } catch (err) {
    next(err);
  }
}

export async function logOut(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) throw err;

    io.in(String(req.session.user)).disconnectSockets();

    return res.clearCookie('sessionId').send({
      success: true,
      message: 'You have been log out',
    });
  });
}

export async function getMe(req: Request, res: Response) {
  const me = req.session.user;

  return res.send({
    success: true,
    message: 'Your data was successfully retrieved',
    data: { me },
  });
}
