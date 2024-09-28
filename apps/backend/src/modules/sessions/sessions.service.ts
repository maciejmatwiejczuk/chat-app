import bcrypt from 'bcrypt';
import * as SessionRepository from './sessions.repository.js';
import AppError from '../../utils/AppError.js';
import { LoginSchema, type LoginDto } from './sessions.schemas.js';

export async function logIn(loginData: LoginDto) {
  const result = LoginSchema.safeParse(loginData);

  if (!result.success) {
    throw new AppError(
      'auth_failed',
      401,
      'Incorrect username or password',
      true
    );
  }

  const user = await SessionRepository.findUserByUsername(result.data.username);

  if (!user) {
    throw new AppError(
      'auth_failed',
      401,
      'Incorrect username or password',
      true
    );
  }

  const isMatch = await bcrypt.compare(result.data.password, user.password);

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
