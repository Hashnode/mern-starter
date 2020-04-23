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

//add Comment a post by cuid
router.route('/posts/:cuid').put(PostController.addComment);

//edit Comment
router.route('/posts/edit/:cuid').put(PostController.editComment);

//delete Comment
router.route('/posts/delete/:cuid').delete(PostController.editComment);




export default router;
