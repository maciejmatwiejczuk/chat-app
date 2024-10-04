import { z } from 'zod';

export const CreateUserSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .regex(
        /^[a-zA-Z0-9_-]{3,20}$/,
        'The username can consist of 3 to 20 symbols including lowercase and uppercase letters and numbers as well as the characters "_" and "-"'
      ),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must contain at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((user) => user.password === user.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const UpdateUserSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Username is required')
      .regex(
        /^[a-z0-9_-]{3,20}$/,
        'The username can consist of lowercase and uppercase letters and numbers as well as the characters "_" and "-"'
      ),
    email: z
      .string()
      .min(1, 'Username is required')
      .email('Wrong email format'),
    password: z
      .string()
      .min(1, 'Username is required')
      .min(8, 'Password must contain at least 8 characters'),
  })
  .partial()
  .strict();

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
