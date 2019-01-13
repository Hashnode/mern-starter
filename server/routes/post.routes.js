import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
const router = new Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

// Create a new comment to post
router.route('/posts/:cuid').post(PostController.createCommentToPost);

// Update an exist comment
router.route('/posts/:cuid').put(PostController.editCommentPost);

export default router;
