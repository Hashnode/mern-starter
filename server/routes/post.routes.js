const Router = require('express').Router;
const PostController = require('../controllers/post.controller');

const router = Router();

// Get all Posts
router.get('/posts', PostController.getPosts);

// Get one post by _id
router.get('/posts/:_id', PostController.getPost);

// Add a new Post
router.post('/posts', PostController.addPost);

// Delete a post by _id
router.delete('/posts/:_id', PostController.deletePost);

module.exports = router;
