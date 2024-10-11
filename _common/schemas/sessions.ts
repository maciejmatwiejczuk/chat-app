import { z } from 'zod';

export const LoginSchema = z.object({
  username: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z0-9_-]{3,20}$/),
  password: z.string().min(1).min(8),
});

export type LoginDto = z.infer<typeof LoginSchema>;
