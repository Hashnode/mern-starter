import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

// Add a new Post
router.route('/comment').post(CommentController.addComment);
router.route('/comment').delete(CommentController.removeComment);

export default router;
