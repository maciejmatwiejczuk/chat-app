import { Router } from 'express';
import { invitationController } from './invitations.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';

export const invitationRouter = Router();

invitationRouter.route('/').get(invitationController.getMany);
invitationRouter.route('/:id').get(authenticate, invitationController.getById);
