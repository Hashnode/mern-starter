import { Router } from 'express';
import * as CommentController from '../controllers/comments.controller';
const router = new Router();

router.route('/comments').get(CommentController.getComments);

router.route('/comments').post(CommentController.addComment);

router.route('/comments/:cuid').delete(CommentController.deleteComment);

export default router;
