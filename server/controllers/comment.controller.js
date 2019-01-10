import Post from '../models/post';
import Comment from '../models/comment';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all comments for post
 * @param req
 * @param res
 * @returns void
 */
export function getComments(req, res) {
  Comment.find({ postCuid: req.params.postCuid }).sort('-dateAdded').exec((err, comments) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comments });
  });
}

/**
 * Save a comment
 * @param req
 * @param res
 * @returns void
 */
export function addComment(req, res) {
  if (!req.body.comment.postCuid || !req.body.comment.name || !req.body.comment.content) {
    res.status(403).end();
  }

  Post.findOne({ cuid: req.body.comment.postCuid }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }

    if (!comment) {
      res.status(403).end();
    }

    const newComment = new Comment(req.body.comment);

    // Let's sanitize inputs
    newComment.name = sanitizeHtml(newComment.name);
    newComment.content = sanitizeHtml(newComment.content);

    newComment.cuid = cuid();
    newComment.save((error, saved) => {
      if (error) {
        res.status(500).send(error);
      }
      res.json({ comment: saved });
    });
  });
}

/**
 * Delete a comment
 * @param req
 * @param res
 * @returns void
 */
export function deleteComment(req, res) {
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
 * Edit a comment
 * @param req
 * @param res
 * @returns void
 */
export function editComment(req, res) {
  if (!req.body.comment.name || !req.body.comment.content) {
    res.status(403).end();
  }

  Comment.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }

    /* eslint-disable no-param-reassign */
    comment.name = sanitizeHtml(req.body.comment.name);
    comment.content = sanitizeHtml(req.body.comment.content);
    /* eslint-enable no-param-reassign */

    comment.save((error, saved) => {
      if (error) {
        res.status(500).send(error);
      }
      res.json({ comment: saved });
    });
  });
}
