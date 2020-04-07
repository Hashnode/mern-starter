import { Router } from 'express';
import * as EmailController from '../controllers/email.controller';

const router = new Router();

// Add route for emails
router.route('/email').post(EmailController.addPost);

export default router;
