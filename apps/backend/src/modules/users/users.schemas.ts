import { z } from 'zod';

export const CreateUserSchema = z
  .object({
    username: z.string().regex(/^[a-z0-9_-]{3,20}$/),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((user) => user.password === user.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const UpdateUserSchema = z
  .object({
    username: z.string().regex(/^[a-z0-9_-]{3,20}$/),
    email: z.string().email(),
    password: z.string().min(8),
  })
  .partial()
  .strict();

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
