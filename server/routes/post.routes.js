import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
const router = new Router();

// Get all Posts
router.route('/').get(PostController.getPosts);

// Get one post by cuid
router.route('/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/').post(PostController.addPost);

// Delete a post by cuid
router.route('/:cuid').delete(PostController.deletePost);

export default router;
