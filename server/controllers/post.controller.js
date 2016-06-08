import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 */
export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns {*}
 */
export function addPost(req, res) { // eslint-disable-line consistent-return
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    return res.status(403).end();
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
      return res.status(500).send(err);
    }
    return res.json({ post: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 */
export function getPost(req, res) {
  const newSlug = req.query.slug.split('-');
  const newCuid = newSlug[newSlug.length - 1];
  Post.findOne({ cuid: newCuid }).exec((err, post) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 */
export function deletePost(req, res) {
  const postId = req.body.postId;
  Post.findById(postId).exec((err, post) => { // eslint-disable-line consistent-return
    if (err) {
      return res.status(500).send(err);
    }

    post.remove(() => {
      return res.status(200).end();
    });
  });
}
