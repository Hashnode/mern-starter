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
  const { author, text } = req.body.patch;

  Comment.findOneAndUpdate({ _id: req.params.cid }, { $set: { text: sanitizeHtml(text), author: sanitizeHtml(author) } }, { new: true }).exec((err, result) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json({ comment: result.toObject() });
  });
}

/**
 * Create new comment.
 * @param req
 * @param res
 * @returns void
 */
export function addComment(req, res) {
  const { author = '', text = '', relatedPost = '' } = req.body.comment;

  if (!author || !text || !relatedPost) {
    res.status(403).end();
  }

  const newComment = new Comment({
    author: sanitizeHtml(author),
    text: sanitizeHtml(text),
    relatedPost,
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
