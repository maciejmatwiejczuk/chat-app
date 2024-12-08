import { Router } from 'express';
import { invitationController } from './invitations.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';

export const invitationRouter = Router();

invitationRouter.route('/').get(authenticate, invitationController.getMany);
