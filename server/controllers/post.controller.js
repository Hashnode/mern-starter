import Post from '../models/post';
import Comment from '../models/comment';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.find()
    .sort('-dateAdded')
    .exec((err, posts) => {
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
 * Save a post comment
 * @param req
 * @param res
 * @returns void
 */
export function addPostComment(req, res) {
  if (!req.body.comment.author || !req.body.comment.content) {
    res.status(403).end();
  }

  const newComment = new Comment(req.body.comment);

  // Let's sanitize inputs
  newComment.author = sanitizeHtml(newComment.author);
  newComment.content = sanitizeHtml(newComment.content);

  newComment.slug = slug(newComment.author.toLowerCase(), { lowercase: true });
  newComment.cuid = cuid();
  newComment.postId = req.params.cuid;

  newComment.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comment: saved });
  });
}

/**
 * Get all comments
 * @param req
 * @param res
 * @returns void
 */
export function getPostComments(req, res) {
  Comment.find({ postId: req.params.cuid })
    .sort('-dateAdded')
    .exec((err, comments) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ comments });
    });
}

/**
 * Delete a comment of post
 * @param req
 * @param res
 * @returns void
 */
export function deletePostComment(req, res) {
  Comment.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }

    comment.remove(() => {
      res.status(200).end();
    });
  });
}

/**
 * Edit a comment of post
 * @param req
 * @param res
 * @returns void
 */
export function editPostComment(req, res) {
  Comment.updateOne({ cuid: req.params.cuid }, { content: req.body.comment.content }).exec(
    (err, comment) => {
      if (err) {
        res.status(500).send(err);
      }

      res.json(comment);
    }
  );
}
