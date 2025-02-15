import { Router } from 'express';
import { userController } from './users.controller.js';
import { authenticate } from '../../../middlewares/authenticate.js';

const router = Router();

router.route('/').post(userController.createUser).get(userController.getUsers);

router
  .route('/:id')
  .get(authenticate, userController.getUserById)
  .patch(authenticate, userController.updateUser)
  .delete(authenticate, userController.deleteUser);

export default router;
