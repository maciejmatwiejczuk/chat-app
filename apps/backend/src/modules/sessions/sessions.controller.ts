import type { NextFunction, Request, Response } from 'express';
import * as SessionService from './sessions.service.js';

export async function logIn(req: Request, res: Response, next: NextFunction) {
  try {
    const { body: loginData } = req;

    const userId = await SessionService.logIn(loginData);

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
