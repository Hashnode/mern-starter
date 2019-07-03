import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

// Get all Comments
router.route('/comments').get(CommentController.getComments);

// Add a new Comment
router.route('/comments').post(CommentController.addComment);

// Update a comment by id
router.route('/comments/:cuid/update').post(CommentController.updateComment);

// Delete a comment by id
router.route('/comments/:cuid/delete').post(CommentController.deleteComment);

export default router;
