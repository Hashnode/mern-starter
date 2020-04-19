import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import postCommentRouter from './postComment.routes';

const router = new Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

// Routes for comments
router.use('/posts/:cuid/comment', postCommentRouter);

export default router;
