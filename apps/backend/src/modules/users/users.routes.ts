import { Router } from 'express';
import type { NextFunction, Request, Response } from 'express';
import * as UserService from './users.service.js';
import { authenticate } from '../../middlewares/authenticate.js';

const router = Router();

router
  .route('/')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const createdUser = await UserService.createUser(req.body);

      return res.status(201).send({
        success: true,
        message: 'User updated successfuly',
        data: { created: { user: createdUser } },
      });
    } catch (err) {
      next(err);
    }
  })
  .get(
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const users = await UserService.getUsers();

        res.send({
          success: true,
          message: 'Users returned successfuly',
          data: { users },
        });
      } catch (err) {
        next(err);
      }
    }
  );

router
  .route('/:id')
  .get(
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = Number(req.params.id);

        const user = await UserService.getUserById(id);

        res.send({
          success: true,
          message: 'User with specified id returned successfuly',
          data: { user },
        });
      } catch (err) {
        next(err);
      }
    }
  )
  .patch(
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = Number(req.params.id);
        const { body: userUpdate } = req;

        const updatedUser = await UserService.updateUser(id, userUpdate);

        return res.send({
          success: true,
          message: 'User updated successfuly',
          data: { updated: { user: updatedUser } },
        });
      } catch (err) {
        next(err);
      }
    }
  )
  .delete(
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = Number(req.params.id);

        const deletedUser = await UserService.deleteUser(id);

        res.send({
          success: true,
          message: 'User deleted successfuly',
          data: { deleted: { user: deletedUser } },
        });
      } catch (err) {
        next(err);
      }
    }
  );

export default router;
