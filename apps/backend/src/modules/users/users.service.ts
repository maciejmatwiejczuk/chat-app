import bcrypt from 'bcrypt';
import { db } from '../../database/db.js';
import AppError from '../../utils/AppError.js';
import type {
  CreateUserDto,
  GetUsersDto,
  UpdateUserDto,
} from '@chat-app/_common/schemas/users.js';
import type { UserInsert } from '../../database/types.js';

export async function createUser(user: CreateUserDto) {
  const userFoundByEmail = await db.user.findByEmail(user.email);

  // This is not a good idea but it probably doesn't matter since it's only a practice project
  if (userFoundByEmail) {
    throw new AppError('entity_exists', 409, 'Could not register user', true, [
      {
        field: 'email',
        message: 'Email already registered',
      },
    ]);
  }

  const userFoundByUsername = await db.user.findByUsername(user.username);

  if (userFoundByUsername) {
    throw new AppError('entity_exists', 409, 'Could not register user', true, [
      {
        field: 'username',
        message: 'Username already registered',
      },
    ]);
  }

  const passwordHash = await bcrypt.hash(user.password, 10);

  const userToInsert: UserInsert = {
    username: user.username,
    email: user.email,
    password: passwordHash,
  };

  const createdUser = await db.user.create(userToInsert);

  return createdUser;
}

export async function getUsers(params: GetUsersDto) {
  const PAGE_LIMIT = 10;
  const offset = (params.page - 1) * PAGE_LIMIT;

  return await db.user.findMany(PAGE_LIMIT, offset, params);
}

export async function getUserById(id: number) {
  const user = await db.user.findById(id);

  if (!user) {
    throw new AppError('not_found', 404, 'User not found', true);
  }

  return user;
}

export async function updateUser(id: number, userUpdate: UpdateUserDto) {
  if (Object.keys(userUpdate).length === 0) {
    throw new AppError('bad_input', 400, 'No fields provided to update', true);
  }

  const updatedUser = await db.user.update(id, userUpdate);

  if (!updatedUser) {
    throw new AppError('not_found', 404, 'User not found', true);
  }

  return updatedUser;
}

export async function deleteUser(id: number) {
  const deletedUser = await db.user.delete(id);

  if (!deletedUser) {
    throw new AppError('not_found', 404, 'User not found', true);
  }

  return deletedUser;
}
