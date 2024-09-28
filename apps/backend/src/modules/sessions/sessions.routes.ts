import { Router } from 'express';
import { authenticate } from '../../middlewares/authenticate.js';
import * as SessionController from './sessions.controller.js';

const router = Router();

router.route('/login').post(SessionController.logIn);

router.route('/logout').post(authenticate, SessionController.logOut);

export default router;
