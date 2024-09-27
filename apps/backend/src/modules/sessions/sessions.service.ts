import bcrypt from 'bcrypt';
import * as SessionRepository from './sessions.repository.js';
import AppError from '../../utils/AppError.js';

export async function logIn(loginData: { username: string; password: string }) {
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
