const Post = require('../models/post');
const slug = require('limax');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
exports.getPosts = function (req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
exports.addPost = function (req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    return res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

/**
 * Get a single post by _id
 * @param req
 * @param res
 * @returns void
 */
exports.getPost = function (req, res) {
  Post.findById(req.params._id).exec((err, post) => {
    if (err || !post) {
      return res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a post by _id
 * @param req
 * @param res
 * @returns void
 */
exports.deletePost = function (req, res) {
  Post.findById(req.params._id).exec((err, post) => {
    if (err || !post) {
      return res.status(500).send(err);
    }
    post.remove((err) => {
      if (err) {
        return console.warn(err);
      }
      res.status(200).end();
    });
  });
}
