const Post = require('../models/post');
const slug = require('limax');

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
exports.getPosts = async function (req, res) {
  console.log(req)
  try {
    const posts = await Post.find().sort('-dateAdded').exec();
    res.json({ posts });
  } catch (e) {
    return res.status(500).send(e);
  }
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
exports.addPost = async function (req, res) {
  try {
    if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
      return res.status(403).end();
    }
    const newPost = new Post(req.body.post);
    newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
    let saved = await newPost.save();
    res.json({ post: saved });
  } catch (e) {
    return res.status(500).send(e);
  }
}

/**
 * Get a single post by slug
 * @param req
 * @param res
 * @returns void
 */
exports.getPost = async function (req, res) {
  try {
    const post = await Post.findOne({ slug: req.params.slug }).exec();
    if (!post) {
      return res.sendStatus(404);
    }
    res.json(post)
  } catch (e) {
    if (e.name === 'CastError')
      return res.sendStatus(400);
    return res.status(500).send(e);
  }
}

/**
 * Delete a post by _id
 * @param req
 * @param res
 * @returns void
 */
exports.deletePost = async function (req, res) {
  try {
    const post = await Post.findById(req.params._id).exec();
    if (!post) {
      return res.sendStatus(404);
    }
    await post.remove();
    res.sendStatus(200);
  } catch (e) {
    if (e.name === 'CastError')
      return res.sendStatus(400);
    return res.status(500).send(e);
  }
}

