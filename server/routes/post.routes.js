const { Router } = require('express');
const PostController = require('../controllers/post.controller');

const router = Router();

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by slug
router.route('/posts/:slug').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by slug
router.route('/posts/:slug').delete(PostController.deletePost);

module.exports = router;
