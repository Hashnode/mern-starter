import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

// Add a comment
router.route('/comments/:postCuid').post(CommentController.addComment);

// Delete a comment
router.route('/comments/:cuid').delete(CommentController.deleteComment);

// Update a comment
router.route('/comments/:cuid').put(CommentController.updateComment);

export default router;
