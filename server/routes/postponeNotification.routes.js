import { Router } from 'express';
import * as PostponeNotificationController from '../controllers/postponeNotification.controller';
const router = new Router();

router.route('/postponeNotification').post(PostponeNotificationController.postponeNotification);

export default router;
