import type { NextFunction, Request, Response } from 'express';
import {
  CreateUserSchema,
  UpdateUserSchema,
} from '@chat-app/_common/schemas/users.js';
import AppError from '../../utils/AppError.js';
import mapFieldErrors from '../../utils/mapFieldErrors.js';
import * as UserService from './users.service.js';

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = CreateUserSchema.safeParse(req.body);

    if (!result.success) {
      throw new AppError(
        'bad_input',
        400,
        'Invalid fields',
        true,
        mapFieldErrors(result.error.issues)
      );
    }

    const createdUser = await UserService.createUser(req.body);

    return res.status(201).send({
      success: true,
      message: 'User updated successfuly',
      user: createdUser,
    });
  } catch (err) {
    next(err);
  }
}

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const usernameSearch = req.query.username;

    if (
      typeof usernameSearch !== 'string' &&
      typeof usernameSearch !== 'undefined'
    ) {
      throw new AppError(
        'bad_input',
        400,
        'Query parameter "username" must be of type string',
        true
      );
    }

    const users = await UserService.getUsers(usernameSearch);

    res.send({
      success: true,
      message: 'Users returned successfuly',
      users,
    });
  } catch (err) {
    next(err);
  }
}

export async function getUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new AppError('not_found', 404, 'User not found', true);
    }

    const user = await UserService.getUserById(id);

    res.send({
      success: true,
      message: 'User with specified id returned successfuly',
      user,
    });
  } catch (err) {
    next(err);
  }
}

export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new AppError('not_found', 404, 'User not found', true);
    }

    const result = UpdateUserSchema.safeParse(req.body);

    if (!result.success) {
      throw new AppError(
        'bad_input',
        400,
        'Invalid fields',
        true,
        mapFieldErrors(result.error.issues)
      );
    }

    const updatedUser = await UserService.updateUser(id, result.data);

    return res.send({
      success: true,
      message: 'User updated successfuly',
      user: updatedUser,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new AppError('not_found', 404, 'User not found', true);
    }

    const deletedUser = await UserService.deleteUser(id);

    res.send({
      success: true,
      message: 'User deleted successfuly',
      user: deletedUser,
    });
  } catch (err) {
    next(err);
  }
}
