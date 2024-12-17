import type { NextFunction, Request, Response } from 'express';
import {
  CreateUserSchema,
  GetUsersSchema,
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
      items: { user: createdUser },
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
    const zodResult = GetUsersSchema.safeParse(req.query);

    if (!zodResult.success) {
      throw new AppError(
        'bad_input',
        400,
        'Invalid parameters',
        true,
        mapFieldErrors(zodResult.error.issues)
      );
    }

    const users = await UserService.getUsers(zodResult.data);

    res.send({
      success: true,
      items: { users },
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
      items: { user },
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
      items: { user: updatedUser },
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
      items: { user: deletedUser },
    });
  } catch (err) {
    next(err);
  }
}
