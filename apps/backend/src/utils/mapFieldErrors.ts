import type { ZodIssue } from 'zod';

export interface FieldError {
  field: string | number | undefined;
  message: string;
}

export default function mapFieldErrors(fieldErrors: ZodIssue[]): FieldError[] {
  return fieldErrors.map((error) => {
    return {
      field: error.path[0],
      message: error.message,
    };
  });
}
