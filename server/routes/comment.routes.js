import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

// Get all Comments for current post
router.route('/posts/:id/comments').get(CommentController.getComments);

// Add a new Comment
router.route('/posts/:id/comment').post(CommentController.addComment);

// Delete a Comment
router.route('/comment/:id').delete(CommentController.deleteComment);

// Edit a Comment
router.route('/comment/:id').put(CommentController.editComment);

export default router;
