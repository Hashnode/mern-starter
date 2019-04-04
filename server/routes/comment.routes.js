import { Router } from 'express';
import * as CommentRoutes from '../controllers/comment.controller';
const router = new Router();

// Get all comments
router.route('/comments').get(CommentRoutes.getComments);

// Get comments by post
router.route('/comment/:post').get(CommentRoutes.getCommentsByPost);

// Add a comment
router.route('/comments').post(CommentRoutes.addComment);

// Delete a comment
router.route('/comments').delete(CommentRoutes.removeComment);

// Update a comment
router.route('/comments').put(CommentRoutes.updateComment);

export default router;
