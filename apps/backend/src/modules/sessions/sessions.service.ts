import bcrypt from 'bcrypt';
import AppError from '../../utils/AppError.js';
import * as SessionRepository from './sessions.repository.js';
import type { LoginDto } from './sessions.schemas.js';

export async function logIn(loginData: LoginDto) {
  const user = await SessionRepository.findUserByUsername(loginData.username);

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

  return user.id;
}
