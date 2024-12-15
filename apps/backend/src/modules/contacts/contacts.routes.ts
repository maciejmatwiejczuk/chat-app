import { Router } from 'express';
import { contactController } from './contacts.controller.js';
import { authenticate } from '../../middlewares/authenticate.js';

export const contactRouter = Router();

contactRouter.route('/').get(authenticate, contactController.getMany);
