import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import * as UserController from '../controllers/users.controller';
const router = new Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

router.route('/checkAdmin').post(UserController.checkAdmin);

router.route('/userList').post(UserController.userList);

router.route('/addUser').post(UserController.addUser);

router.route('/editUser').post(UserController.editUser);

router.route('/deleteUser').post(UserController.deleteUser);

export default router;
