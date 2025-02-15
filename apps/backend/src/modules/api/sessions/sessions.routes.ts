import { Router } from 'express';
import { authenticate } from '../../../middlewares/authenticate.js';
import { sessionController } from './sessions.controller.js';

const router = Router();

router.route('/login').post(sessionController.logIn);

router.route('/logout').post(authenticate, sessionController.logOut);

router.route('/me').get(authenticate, sessionController.getMe);

export default router;
