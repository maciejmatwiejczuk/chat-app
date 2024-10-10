import type { ZodIssue } from 'zod';

export interface FieldError {
  field: string;
  message: string;
}

export default function mapFieldErrors(fieldErrors: ZodIssue[]): FieldError[] {
  return fieldErrors.map((error) => {
    return {
      field: String(error.path[0]),
      message: error.message,
    };
  });
}
