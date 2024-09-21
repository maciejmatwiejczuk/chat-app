import { Router } from 'express';
import type { Request, Response } from 'express';
import { UserSchema } from './users.schemas.js';
import * as UserRepository from './users.repository.js';

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
        errors: result.error.issues,
      });
    }

    const userToInsert = { ...user };
    delete userToInsert.confirmPassword;

    const createdUser = await UserRepository.createUser(userToInsert);

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

    const user = await UserRepository.findUserById(id);

    res.send({
      success: true,
      message: 'User with specifies id returned successfuly',
      data: { user },
    });
  })
  .patch(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { body: user } = req;

    const result = UserSchema.partial().safeParse(user);

    if (!result.success) {
      return res.status(400).send({
        success: false,
        message: 'Invalid fields',
        errors: result.error.issues,
      });
    }

    const updatedUser = await UserRepository.updateUser(id, user);

    return res.send({
      success: true,
      message: 'User updated successfuly',
      data: { updated: { user: updatedUser } },
    });
  })
  .delete(async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const deletedUser = await UserRepository.deleteUser(id);

    res.send({
      success: true,
      message: 'User deleted successfuly',
      data: { deleted: { user: deletedUser } },
    });
  });

export default router;
