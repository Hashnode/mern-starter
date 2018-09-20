import { Router } from 'express';
import * as UsersController from '../controllers/users.controller';
const router = new Router();

router.route('').get(UsersController.index);



export default router;
