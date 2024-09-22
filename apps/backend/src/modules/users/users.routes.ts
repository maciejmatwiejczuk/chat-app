import { Router } from 'express';
import type { Request, Response } from 'express';
import { UserSchema } from './users.schemas.js';
import * as UserRepository from './users.repository.js';
import mapFieldErrors from '../../utils/mapFieldErrors.js';

const router = Router();

router
  .route('/')
  .post(async (req: Request, res: Response) => {
    const { body: user } = req;

    const result = UserSchema.safeParse(user);

    if (!result.success) {
      return res.status(400).send({
        success: false,
        message: 'Invalid fields',
        errors: mapFieldErrors(result.error.issues),
      });
    }

    const userFoundByEmail = await UserRepository.findUserByEmail(
      result.data.email
    );

    // This is not a good idea but it doesn't matter since it's only a practice project
    if (userFoundByEmail) {
      return res.status(409).send({
        success: false,
        message: 'Could not register user',
        errors: [
          {
            field: 'email',
            message: 'Email already registered',
          },
        ],
      });
    }

    const userFoundByUsername = await UserRepository.findUserByUsername(
      result.data.username
    );

    if (userFoundByUsername) {
      return res.status(409).send({
        success: false,
        message: 'Could not register user',
        errors: [
          {
            field: 'username',
            message: 'Username already registered',
          },
        ],
      });
    }

    const createdUser = await UserRepository.createUser(result.data);

    return res.status(201).send({
      success: true,
      message: 'New user created successfuly',
      data: { created: { user: createdUser } },
    });
  })
  .get(async (req: Request, res: Response) => {
    const users = await UserRepository.findUsers({});

    res.send({
      success: true,
      message: 'Users returned successfuly',
      data: { users },
    });
  });

router
  .route('/:id')
  .get(async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    const user = await UserRepository.findUserById(id);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    res.send({
      success: true,
      message: 'User with specified id returned successfuly',
      data: { user },
    });
  })
  .patch(async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    const { body: user } = req;
    if (Object.keys(user).length === 0) {
      return res.status(400).send({
        success: false,
        message: 'No fields provided to update',
      });
    }

    const result = UserSchema.partial().strict().safeParse(user);

    if (!result.success) {
      return res.status(400).send({
        success: false,
        message: 'Invalid fields',
        errors: mapFieldErrors(result.error.issues),
      });
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
  })
  .delete(async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    const deletedUser = await UserRepository.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    res.send({
      success: true,
      message: 'User deleted successfuly',
      data: { deleted: { user: deletedUser } },
    });
  });

export default router;
