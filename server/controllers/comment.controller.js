import Post from '../models/post';
import Comment from '../models/comment';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all comments for post
 * @param req
 * @param res
 * @returns void
 */
export function getComments(req, res) {
  Post.findOne({ _id: req.params.id })
    .populate(
      'comments',
      'username content dateAdded',
      null,
      { sort: '-dateAdded' }).exec((err, post) => {
        if (err) {
          res.status(500).send(err);
        }
        res.json({ comments: post.comments });
      });
}

/**
 * Save a comment
 * @param req
 * @param res
 * @returns void
 */
export function addComment(req, res) {
  if (!req.body.comment.username || !req.body.comment.content) {
    res.status(403).end();
  }

  Post.findOne({ _id: req.params.id }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    const newComment = new Comment(req.body.comment);

    // Let's sanitize inputs
    newComment.username = sanitizeHtml(newComment.username);
    newComment.content = sanitizeHtml(newComment.content);

    // Associate comment with Post
    newComment.post = post._id;

    newComment.save((error, saved) => {
      if (error) {
        res.status(500).send(error);
      }

      // Associate Post with comment
      post.comments.push(saved._id);
      post.save((errorPost) => {
        if (errorPost) {
          res.status(500).send(errorPost);
        }
        res.json({ comment: saved });
      });
    });
  });
}

/**
 * Get a single comment
 * @param req
 * @param res
 * @returns void
 */
export function getComment(req, res) {
  Comment.findOne({ _id: req.params.id }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comment });
  });
}

/**
 * Delete a comment
 * @param req
 * @param res
 * @returns void
 */
export function deleteComment(req, res) {
  Comment.findOne({ _id: req.params.id }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }
    if (comment) {
      comment.remove(() => {
        res.status(200).end();
      });
    }
    res.status(404).end();
  });
}
