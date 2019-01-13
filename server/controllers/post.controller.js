import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
const ObjectId = require('mongodb').ObjectID;

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
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
export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}

/**
 * @route POST
 * @desc add new comment to post
 * @access Public
 */
export async function createCommentToPost(req, res) {
  const post = await Post.findById(req.params.cuid);

  const newComment = {
    name: req.body.comment.name,
    text: req.body.comment.text,
  };

  if (!post) {
    return res.status(404).json({ postnotfound: 'No post found' });
  }

  // Add comment to comments array
  post.comments.unshift(newComment);
  const commentedPost = await post.save();
  return res.json(commentedPost);
}

/**
 * @route PUT
 * @desc update comment post
 * @access Public
 */
export async function editCommentPost(req, res) {
  const { commentId, name, text } = req.body.comment;
  const _id = new ObjectId(commentId);
  const dateAdded = new Date().toISOString();
  const newComment = { _id, name, text, dateAdded };

  const onePost = await Post.findById(req.params.cuid);
  const updComments = onePost.comments.map(comment => comment._id.toString() === commentId ? newComment : comment);

  onePost.comments = updComments;
  const updCommentedPost = await onePost.save();
  return res.json(updCommentedPost);
}
