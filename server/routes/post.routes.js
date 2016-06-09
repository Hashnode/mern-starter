import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
const router = new Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by title
router.route('/posts/:slug').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a Post
router.route('/posts').delete(PostController.deletePost);

export default router;
