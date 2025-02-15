import type { NextFunction, Request, Response } from 'express';
import {
  CreateUserSchema,
  GetUsersSchema,
  UpdateUserSchema,
} from '@chat-app/_common/schemas/users.js';
import AppError from '../../../utils/AppError.js';
import mapFieldErrors from '../../../utils/mapFieldErrors.js';
import { userService } from './users.service.js';

export const userController = {
  async createUser(req: Request, res: Response, next: NextFunction) {
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

      const createdUser = await userService.createUser(req.body);

      return res.status(201).send({
        success: true,
        items: { user: createdUser },
      });
    } catch (err) {
      next(err);
    }
  },
  async getUsers(req: Request, res: Response, next: NextFunction) {
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

      const users = await userService.getUsers(zodResult.data);

      res.send({
        success: true,
        items: { users },
      });
    } catch (err) {
      next(err);
    }
  },
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        throw new AppError('not_found', 404, 'User not found', true);
      }

      const user = await userService.getUserById(id);

      res.send({
        success: true,
        items: { user },
      });
    } catch (err) {
      next(err);
    }
  },
  async updateUser(req: Request, res: Response, next: NextFunction) {
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

      const updatedUser = await userService.updateUser(id, result.data);

      return res.send({
        success: true,
        items: { user: updatedUser },
      });
    } catch (err) {
      next(err);
    }
  },
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        throw new AppError('not_found', 404, 'User not found', true);
      }

      const deletedUser = await userService.deleteUser(id);

      res.send({
        success: true,
        items: { user: deletedUser },
      });
    } catch (err) {
      next(err);
    }
  },
};
