import Post from '../models/post';
import Comment from '../models/comment';
import cuid from 'cuid';
import slug from 'limax';
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

  Post.findOne({ cuid: req.body.comment.postCuid }).exec((err, post) => {
      if (err) {
        res.status(500).send(err);
      }

      if (!post) {
        res.status(403).end();
      }

      const newComment = new Comment(req.body.comment);

      // Let's sanitize inputs
      newComment.name = sanitizeHtml(newPost.name);
      newComment.content = sanitizeHtml(newPost.content);

      newComment.cuid = cuid();
      newComment.save((err, saved) => {
        if (err) {
          res.status(500).send(err);
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
  Comment.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}
