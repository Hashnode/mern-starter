import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

// Get all Comments for post
router.route('/posts/:id/comment').get(CommentController.getComments);

// Get one comment by id
router.route('/comment/:id').get(CommentController.getComment);

// Add a new Post
router.route('/posts/:id/comment').post(CommentController.addComment);

// Update a comment by id
router.route('/comment/:id').put(CommentController.updateComment);

// Delete a comment by id
router.route('/comment/:id').delete(CommentController.deleteComment);

export default router;
