import type { ZodIssue } from 'zod';
import type { FieldError } from '@chat-app/_common/types.js';

export default function mapFieldErrors(fieldErrors: ZodIssue[]): FieldError[] {
  return fieldErrors.map((error) => {
    return {
      field: String(error.path[0]),
      message: error.message,
    };
  });
}
