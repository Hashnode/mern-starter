import sanitizeHtml from 'sanitize-html';

import Comment from '../models/comment';

/**
 * Get all comments for some post
 * @param req
 * @param res
 * @returns void
 */
export const getComments = (req, res) => {
  Comment.find({ postId: req.params.id })
    .exec((err, comments) => {
      if (err) {
        res.status(500)
          .send(err);
      }
      res.json({ comments });
    });
};

/**
 * Save a comment
 * @param req
 * @param res
 * @returns void
 */
export const addComment = (req, res) => {
  if (!req.body.comment || !req.body.comment.content || !req.body.comment.createdBy) {
    res.status(403).send();
  }
  const newComment = new Comment(req.body.comment);

  newComment.content = sanitizeHtml(newComment.content);
  newComment.createdBy = sanitizeHtml(newComment.createdBy);
  newComment.postId = req.params.id;

  newComment.save((error, saved) => {
    if (error) {
      res.status(500).send(error);
    }
    res.json({ comment: saved });
  });
};

/**
 * Get a single comment
 * @param req
 * @param res
 * @returns void
 */
export const getComment = (req, res) => {
  Comment.findOne({ postId: req.params.id })
    .exec((err, comment) => {
      if (err) {
        res.status(500)
          .send(err);
      }
      res.json({ comment });
    });
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deleteComment(req, res) {
  Comment.findOne({ postId: req.params.id })
    .exec((err, comment) => {
      if (err || !comment) {
        res.status(500)
          .send(err);
      }

      comment.remove(() => {
        res.status(200)
          .end();
      });
    });
}
