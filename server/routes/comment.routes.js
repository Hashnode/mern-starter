import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

// Get all Comments for specified post id
router.route('/comments/:pid').get(CommentController.getComments);

// Update comment
router.route('/comments/:cid').patch(CommentController.updateComment);

// Add a new comment
router.route('/comments/:pid').post(CommentController.addComment);

// Delete a comment
router.route('/comments/:cid').delete(CommentController.deleteComment);

export default router;
