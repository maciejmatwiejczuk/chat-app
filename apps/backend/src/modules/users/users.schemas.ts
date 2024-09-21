import { z } from 'zod';

export const UserSchema = z.object({
  username: z.string().regex(/^[a-z0-9_-]{3,20}$/),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
});
