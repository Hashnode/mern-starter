import { Router } from 'express';
import * as PostCommentController from '../controllers/postComment.controller';
const router = new Router({ mergeParams: true });

router.route('/').post(PostCommentController.addComment);

router.route('/:commentId').delete(PostCommentController.deleteComment);

router.route('/:commentId').put(PostCommentController.editComment);

export default router;
