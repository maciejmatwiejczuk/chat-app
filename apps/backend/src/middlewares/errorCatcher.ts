import type { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/ErrorHandler.js';
import AppError from '../utils/AppError.js';

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!ErrorHandler.isTrustedError(err)) {
    next(err);
  }

  ErrorHandler.handleError(err);

  if (err instanceof AppError) {
    return res.status(err.httpCode).send({
      success: false,
      message: err.message,
      errors: err.fieldErrors,
    });
  }
};
