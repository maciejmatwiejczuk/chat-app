import type { FieldError } from './mapFieldErrors.js';

export type ErrorName = 'not_found' | 'bad_input' | 'entity_exists';

export default class AppError extends Error {
  public override readonly name: ErrorName;
  public readonly httpCode: number;
  public readonly isOperational: boolean;
  public readonly fieldErrors?: FieldError[];

  constructor(
    name: ErrorName,
    httpCode: number,
    message: string,
    isOperational: boolean,
    fieldErrors?: FieldError[]
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;
    this.fieldErrors = fieldErrors;

    Error.captureStackTrace(this);
  }
}
