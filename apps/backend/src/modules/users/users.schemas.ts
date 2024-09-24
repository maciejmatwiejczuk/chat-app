import { z } from 'zod';

export const CreateUserSchema = z.object({
  username: z.string().regex(/^[a-z0-9_-]{3,20}$/),
  email: z.string().email(),
  password: z.string().min(8),
});

export const UpdateUserSchema = CreateUserSchema.partial().strict();

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
