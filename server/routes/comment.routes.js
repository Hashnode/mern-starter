import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

// Get all Comments
router.route('/comments/:postId').get(CommentController.getComments);

// Add a new Comment
router.route('/comments').post(CommentController.addComment);

// Delete a Comment by cuid
router.route('/comments/:cuid').delete(CommentController.deleteComment);
// Edit a Comment by cuid
router.route('/comments/:cuid').put(CommentController.editComment);

export default router;
