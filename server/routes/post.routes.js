const Router = require('express').Router;
const PostController = require('../controllers/post.controller');

const router = Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by _id
router.route('/posts/:_id').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by _id
router.route('/posts/:_id').delete(PostController.deletePost);

module.exports = router;
