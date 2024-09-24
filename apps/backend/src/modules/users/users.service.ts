import { CreateUserSchema, UpdateUserSchema } from './users.schemas.js';
import type { CreateUserDto, UpdateUserDto } from './users.schemas.js';
import * as UserRepository from './users.repository.js';
import mapFieldErrors from '../../utils/mapFieldErrors.js';
import AppError from '../../utils/AppError.js';

export async function createUser(user: CreateUserDto) {
  const result = CreateUserSchema.safeParse(user);

  if (!result.success) {
    throw new AppError(
      'bad_input',
      400,
      'Invalid fields',
      true,
      mapFieldErrors(result.error.issues)
    );
  }

  const userFoundByEmail = await UserRepository.findUserByEmail(
    result.data.email
  );

  // This is not a good idea but it probably doesn't matter since it's only a practice project
  if (userFoundByEmail) {
    throw new AppError('entity_exists', 409, 'Could not register user', true, [
      {
        field: 'email',
        message: 'Email already registered',
      },
    ]);
  }

  const userFoundByUsername = await UserRepository.findUserByUsername(
    result.data.username
  );

  if (userFoundByUsername) {
    throw new AppError('entity_exists', 409, 'Could not register user', true, [
      {
        field: 'username',
        message: 'Username already registered',
      },
    ]);
  }

  const createdUser = await UserRepository.createUser(result.data);

  return createdUser;
}

export async function getUsers() {
  const users = await UserRepository.findUsers({});

  return users;
}

export async function getUserById(id: number) {
  if (isNaN(id)) {
    throw new AppError('not_found', 404, 'User not found', true);
  }

  const user = await UserRepository.findUserById(id);

  if (!user) {
    throw new AppError('not_found', 404, 'User not found', true);
  }

  return user;
}

export async function updateUser(id: number, userUpdate: UpdateUserDto) {
  if (isNaN(id)) {
    throw new AppError('not_found', 404, 'User not found', true);
  }

  if (Object.keys(userUpdate).length === 0) {
    throw new AppError('bad_input', 400, 'No fields provided to update', true);
  }

  const result = UpdateUserSchema.safeParse(userUpdate);

  if (!result.success) {
    throw new AppError(
      'bad_input',
      400,
      'Invalid fields',
      true,
      mapFieldErrors(result.error.issues)
    );
  }

  const updatedUser = await UserRepository.updateUser(id, result.data);

  if (!updatedUser) {
    throw new AppError('not_found', 404, 'User not found', true);
  }

  return updatedUser;
}

export async function deleteUser(id: number) {
  if (isNaN(id)) {
    throw new AppError('not_found', 404, 'User not found', true);
  }

  const deletedUser = await UserRepository.deleteUser(id);

  if (!deletedUser) {
    throw new AppError('not_found', 404, 'User not found', true);
  }

  return deletedUser;
}
