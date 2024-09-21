import { Router } from 'express';
import type { Request, Response } from 'express';
import { UserSchema } from './users.schemas.js';

const router = Router();

router
  .route('/')
  .post((req: Request, res: Response) => {
    const { body: user } = req;
    console.log(user);

    const result = UserSchema.safeParse(user);
    console.log(result);

    if (!result.success) {
      console.log(result.error);
      return res.status(400).send({ message: 'Invalid fields' });
    }

    return res.status(201).send({ message: 'User created' });
  })
  .get((req: Request, res: Response) => {
    res.send({ message: 'All users returned' });
  });

router
  .route('/:id')
  .get((req: Request, res: Response) => {
    res.send({ message: 'User with specifies id returned' });
  })
  .patch((req: Request, res: Response) => {
    res.send({ message: 'User updated' });
  })
  .delete((req: Request, res: Response) => {
    res.send({ message: 'User deleted' });
  });

export default router;
