import { Router } from 'express';
import type { NextFunction, Request, Response } from 'express';
import { UserSchema } from './users.schemas.js';
import * as UserRepository from './users.repository.js';
import mapFieldErrors from '../../utils/mapFieldErrors.js';
import AppError from '../../utils/AppError.js';

const router = Router();

router
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body: user } = req;

      const result = UserSchema.safeParse(user);

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
        throw new AppError(
          'entity_exists',
          409,
          'Could not register user',
          true,
          [
            {
              field: 'email',
              message: 'Email already registered',
            },
          ]
        );
      }

      const userFoundByUsername = await UserRepository.findUserByUsername(
        result.data.username
      );

      if (userFoundByUsername) {
        throw new AppError(
          'entity_exists',
          409,
          'Could not register user',
          true,
          [
            {
              field: 'username',
              message: 'Username already registered',
            },
          ]
        );
      }

      const createdUser = await UserRepository.createUser(result.data);

      return res.status(201).send({
        success: true,
        message: 'New user created successfuly',
        data: { created: { user: createdUser } },
      });
    } catch (error) {
      next(error);
    }
  })
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await UserRepository.findUsers({});

      res.send({
        success: true,
        message: 'Users returned successfuly',
        data: { users },
      });
    } catch (error) {
      next(error);
    }
  });

router
  .route('/:id')
  .get(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        throw new AppError('not_found', 404, 'User not found', true);
      }

      const user = await UserRepository.findUserById(id);

      if (!user) {
        throw new AppError('not_found', 404, 'User not found', true);
      }

      res.send({
        success: true,
        message: 'User with specified id returned successfuly',
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  })
  .patch(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        throw new AppError('not_found', 404, 'User not found', true);
      }

      const { body: user } = req;

      if (Object.keys(user).length === 0) {
        throw new AppError(
          'bad_input',
          400,
          'No fields provided to update',
          true
        );
      }

      const result = UserSchema.partial().strict().safeParse(user);

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
        return res.status(404).send({
          success: false,
          message: 'User not found',
        });
      }

      return res.send({
        success: true,
        message: 'User updated successfuly',
        data: { updated: { user: updatedUser } },
      });
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        throw new AppError('not_found', 404, 'User not found', true);
      }

      const deletedUser = await UserRepository.deleteUser(id);

      if (!deletedUser) {
        throw new AppError('not_found', 404, 'User not found', true);
      }

      res.send({
        success: true,
        message: 'User deleted successfuly',
        data: { deleted: { user: deletedUser } },
      });
    } catch (error) {
      next(error);
    }
  });

export default router;
