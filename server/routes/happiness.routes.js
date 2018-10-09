import { Router } from 'express';
import * as HappinessController from '../controllers/happiness.controller';
const router = new Router();

// Add a new Happiness
router.route('/happinesses').post(HappinessController.addHappiness);

export default router;
