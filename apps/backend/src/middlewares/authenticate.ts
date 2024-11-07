import type { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError.js';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  if (!req.session.user) {
    const error = new AppError(
      'auth_failed',
      401,
      'You are not logged in',
      true
    );
    next(error);
  }

  return next();
}
