import type { ZodIssue } from 'zod';

export default function mapFieldErrors(fieldErrors: ZodIssue[]) {
  return fieldErrors.map((error) => {
    return {
      field: error.path[0],
      message: error.message,
    };
  });
}
