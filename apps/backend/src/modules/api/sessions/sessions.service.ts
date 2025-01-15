import bcrypt from 'bcrypt';
import { db } from '../../../database/db.js';
import AppError from '../../../utils/AppError.js';
import type { LoginDto } from '@chat-app/_common/schemas/sessions.js';

export async function logIn(loginData: LoginDto) {
  const user = await db.user.findByUsername(loginData.username);

  if (!user) {
    throw new AppError(
      'auth_failed',
      401,
      'Incorrect username or password',
      true
    );
  }

  const isMatch = await bcrypt.compare(loginData.password, user.password);

  if (!isMatch) {
    throw new AppError(
      'auth_failed',
      401,
      'Incorrect username or password',
      true
    );
  }

  return { id: user.id, username: user.username, email: user.email };
}
