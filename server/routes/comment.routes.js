import { Router } from 'express';
import * as CommentController from '../controllers/comment.controller';
const router = new Router();

// Get all Comments
router.route('/:id').get(CommentController.getComments);

// Get one post by cuid
// router.route('/comments/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/').post(CommentController.addComment);

// Delete a post by cuid
router.route('/:cuid').delete(CommentController.deleteComment);

// Edit a post by id
router.route('/:id').post(CommentController.editComment);
export default router;
