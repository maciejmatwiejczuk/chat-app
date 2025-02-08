import { Router } from 'express';
import { messageController } from './messages.controller.js';

export const messageRouter = Router();

messageRouter.route('/chat').get(messageController.getChat);
