import { Router } from 'express';
import * as UserController from '../controllers/users.controller';
const router = new Router();


router.route('/admin/checkSession').post(UserController.checkSession);

router.route('/admin/checkAdmin').post(UserController.checkAdmin);

router.route('/admin/userList').post(UserController.userList);

router.route('/admin/addUser').post(UserController.addUser);

router.route('/admin/editUser').post(UserController.editUser);

router.route('/admin/deleteUser').post(UserController.deleteUser);

router.route('/admin/sendSMS').post(UserController.sendSMS);

router.route('/admin/trigger').post(UserController.triggerNotification);

router.route('/admin/stopTrigger').post(UserController.stopTrigger);

router.route('/admin/delay').post(UserController.delay);

export default router;
