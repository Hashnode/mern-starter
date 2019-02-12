import Comment from '../models/comment';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all comments
 * @param req
 * @param res
 * @returns void
 */
export function getComments(req, res) {
  Comment.find({ relatedPost: req.params.pid }).exec((err, comments) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comments });
  });
}

/**
 * Update comment
 * @param req
 * @param res
 * @returns void
 */
export function updateComment(req, res) {
  Comment.updateOne({ _id: req.params.cid }, { $set: { text: sanitizeHtml(req.body.patch.text) } }).exec((err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(result);
  });
}

/**
 * Create new comment.
 * @param req
 * @param res
 * @returns void
 */
export function addComment(req, res) {
  const { author = '', text = '' } = req.body.post;

  if (!author || !text) {
    res.status(403).end();
  }

  const newComment = new Comment({
    author: sanitizeHtml(author),
    text: sanitizeHtml(text),
    relatedPost: req.params.pid,
  });

  newComment.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json({ comment: saved });
  });
}

/**
 * Delete comment.
 * @param req
 * @param res
 * @returns void
 */
export function deleteComment(req, res) {
  Comment.findOne({ _id: req.params.cid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
