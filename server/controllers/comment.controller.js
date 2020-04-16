import Comment from '../models/comment';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import Post from '../models/post';

/**
 * Add a comment
 * @param req
 * @param res
 * @returns void
 */
export function addComment(req, res) {
  if (!req.body.comment || !req.body.comment.content || !req.body.comment.author) {
    res.status(400).end();
    return;
  }

  const newComment = new Comment(req.body.comment);

  // Input sanitization
  newComment.content = sanitizeHtml(newComment.content);
  newComment.author = sanitizeHtml(newComment.author);

  newComment.cuid = cuid();

  newComment.save((commentSaveErr, savedComment) => {
    if (commentSaveErr) {
      res.status(500).send(commentSaveErr);
      return;
    }
    Post.findOne({ cuid: req.params.postCuid }).exec((postFindErr, post) => {
      if (postFindErr) {
        res.status(500).send(postFindErr);
        return;
      }
      post.comments.push(savedComment);
      post.save((err) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.json({ comment: savedComment });
      });
    });
  });
}

export function updateComment(req, res) {
  if (!req.body.comment || !req.body.comment.content) {
    res.status(400).end();
    return;
  }

  Comment.findOne({ cuid: req.params.cuid }).exec((commentFindErr, comment) => {
    if (commentFindErr) {
      res.status(500).send(commentFindErr);
      return;
    }
    if (!comment) {
      res.status(400).end();
      return;
    }
    // eslint-disable-next-line no-param-reassign
    comment.content = req.body.comment.content;
    comment.save((commentSaveErr, savedComment) => {
      if (commentSaveErr) {
        res.status(500).send(commentSaveErr);
        return;
      }
      res.json({ comment: savedComment });
    });
  });
}

/**
 * Delete a comment by cuid
 * @param req
 * @param res
 * @returns void
 */
export function deleteComment(req, res) {
  Comment.findOneAndRemove({ cuid: req.params.cuid }).exec((commentFindErr, comment) => {
    if (commentFindErr) {
      res.status(500).send(commentFindErr);
      return;
    }
    if (!comment) {
      res.status(400).end();
      return;
    }
    Post.findOne({ comments: comment._id }).exec((postFindErr, post) => {
      if (postFindErr) {
        res.status(500).send(postFindErr);
        return;
      }
      // eslint-disable-next-line no-param-reassign
      post.comments = post.comments.filter(commentId => !commentId.equals(comment._id));
      post.save((err) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.status(200).end();
      });
    });
  });
}
