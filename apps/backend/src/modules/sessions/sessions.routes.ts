import { Router } from 'express';
import type { NextFunction, Request, Response } from 'express';
import * as SessionService from './sessions.service.js';

const router = Router();

router
  .route('/login')
  .post(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body: loginData } = req;

      const userId = await SessionService.logIn(loginData);

      req.session.userId = userId;

      res.send({
        success: true,
        message: 'You have logged in successfully',
        data: { userId },
      });
    } catch (err) {
      next(err);
    }
  });

export default router;
