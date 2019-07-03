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

// Get all comments of post
router.route('/posts/:cuid/comments').get(PostController.getPostComments);

// Add a new comment of post
router.route('/posts/:cuid/comment').post(PostController.addPostComment);

// Edit comment of post
router.route('/comment/:cuid').put(PostController.editPostComment);

// Delete comment of post
router.route('/comment/:cuid').delete(PostController.deletePostComment);

export default router;
