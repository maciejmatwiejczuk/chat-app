import { Router } from 'express';
import * as UserController from './users.controller.js';
import { authenticate } from '../../../middlewares/authenticate.js';

const router = Router();

router.route('/').post(UserController.createUser).get(UserController.getUsers);

router
  .route('/:id')
  .get(authenticate, UserController.getUserById)
  .patch(authenticate, UserController.updateUser)
  .delete(authenticate, UserController.deleteUser);

export default router;
