import Comment from '../models/comment';
import Post from '../models/post';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all possible comments
 * @param req
 * @param res
 * @returns void
 */
export function getAllComments(req, res) {
  Comment
    .find()
    .exec((err, comments) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ comments });
    });
}

/**
 * Get comments by post cuid
 * @param req
 * @param res
 * @returns void
 */
export function getComments(req, res) {
  Post
    .findOne({ cuid: req.params.cuid })
    .populate('comments')
    .exec((err, post) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ comments: post.comments });
    });
}

/**
 * Add new comment to post
 * @param req
 * @param res
 * @returns void
 */
export function addComment(req, res) {
  if (!req.body.comment.author || !req.body.comment.content || !req.params.postId) {
    res.status(403).end();
  }

  Post.findOne({ cuid: req.params.postId }, (err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    const newComment = new Comment(req.body.comment);

    newComment.postId = post.cuid;
    newComment.author = sanitizeHtml(newComment.author);
    newComment.content = sanitizeHtml(newComment.content);

    newComment.cuid = cuid();

    newComment.save((error, comment) => {
      if (error) {
        res.status(500).send(error);
      }
      res.status(201).json({ comment });
    });
  });
}

/**
 * Edit a comment by comment cuid
 * @param req
 * @param res
 * @returns void
 */
export function editComment(req, res) {
  if (!req.body.comment.author || !req.body.comment.content) {
    res.status(403).end();
  }

  // const fieldsToUpdate = {
  //   author: sanitizeHtml(req.body.comment.author),
  //   content: sanitizeHtml(req.body.comment.content),
  // };

  Comment
    .findOne({ cuid: req.params.cuid })
    .exec((err, comment) => {
      if (err) {
        res.status(500).send(err);
      }
      comment.author = sanitizeHtml(req.body.comment.author); // eslint-disable-line no-param-reassign
      comment.content = sanitizeHtml(req.body.comment.content); // eslint-disable-line no-param-reassign
      comment.save();
      res.json({ comment });
    });
}

/**
 * Delete a comment by comment cuid
 * @param req
 * @param res
 * @returns void
 */
export function deleteComment(req, res) {
  Comment.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }
    if (comment) {
      Comment.remove({ cuid: req.params.cuid }, () => {
        res.status(200).end();
      });
    } else res.status(404).end();
  });
}
