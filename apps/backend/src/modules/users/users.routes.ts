import { Router } from 'express';
import type { Request, Response } from 'express';
import { UserSchema } from './users.schemas.js';

const router = Router();

router
  .route('/')
  .post((req: Request, res: Response) => {
    const { body: user } = req;

    const result = UserSchema.safeParse(user);

    if (!result.success) {
      return res.status(400).send({
        success: false,
        message: 'Invalid fields',
        errors: result.error.issues,
      });
    }

    return res
      .status(201)
      .send({ success: true, message: 'New user created successfuly' });
  })
  .get((req: Request, res: Response) => {
    res.send({ message: 'Users returned successfuly' });
  });

router
  .route('/:id')
  .get((req: Request, res: Response) => {
    res.send({ message: 'User with specifies id returned successfuly' });
  })
  .patch((req: Request, res: Response) => {
    const { body: user } = req;

    const result = UserSchema.partial().safeParse(user);

    if (!result.success) {
      return res.status(400).send({
        success: false,
        message: 'Invalid fields',
        errors: result.error.issues,
      });
    }

    return res.send({ success: true, message: 'User updated successfuly' });
  })
  .delete((req: Request, res: Response) => {
    res.send({ message: 'User deleted successfuly' });
  });

export default router;
