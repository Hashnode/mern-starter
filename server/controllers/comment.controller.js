import Comment from '../models/comment';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all comments
 * @param req
 * @param res
 * @returns void
 */
export function getComments(req, res) {

  Comment.find({ post_id: req.query.post_id }).limit(50).exec((err, comments) => {

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
  
  if (!req.body.comment.post_id || !req.body.comment.author || !req.body.comment.text) {
    res.status(403).end();
  }

  const newComment = new Comment(req.body.comment);

  // Let's sanitize inputs
  newComment.post_id = sanitizeHtml(newComment.post_id);
  newComment.author = sanitizeHtml(newComment.author);
  newComment.text = sanitizeHtml(newComment.text);

  newComment.slug = slug(newComment.author, { lowercase: true });
  newComment.cuid = cuid();
  newComment.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comment: saved });
  });
}

/**
 * Update a comment
 * @param req
 * @param res
 * @returns void
 */
export function updateComment(req, res) {

  Comment.findOne({ _id: req.params.cuid }).exec((err, comment) => {

    if (err || !comment) {
      return res.status(500).send(err);
    }

    comment.text = req.body.text;

    comment.save(function (err, updatedComment) {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(updatedComment);
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
  Comment.findOne({ _id: req.params.cuid }).exec((err, comment) => {
    if (err || !comment) {
      res.status(500).send(err);
    }

    comment.remove(() => {
      res.status(200).end();
    });
  });
}
