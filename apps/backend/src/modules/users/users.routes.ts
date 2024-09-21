import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

router
  .route('/')
  .post((req: Request, res: Response) => {
    res.status(201).send({ message: 'User created' });
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
