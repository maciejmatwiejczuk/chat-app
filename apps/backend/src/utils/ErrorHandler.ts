import AppError from './AppError.js';

class ErrorHandler {
  public handleError(err: Error): void {
    console.error(err);
  }

  public isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }
}

export default new ErrorHandler();
