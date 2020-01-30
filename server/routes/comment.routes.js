import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

// Get all comments
router.route('/comments').get(CommentController.getAllComments);

// Get comments by post's cuid
router.route('/comments/:postId').get(CommentController.getComments);

// Add a comment
router.route('/comments/:postId').post(CommentController.addComment);

// Edit a comment
router.route('/comments/:cuid').put(CommentController.editComment);

// Delete a comment by cuid
router.route('/comments/:cuid').delete(CommentController.deleteComment);

export default router;
