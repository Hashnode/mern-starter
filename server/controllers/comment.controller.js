import Comment from '../models/comment';
import cuid from 'cuid';

/**
 * Get all comments
 * @param req
 * @param res
 * @returns void
 */
export function getComments(req, res) {
  Comment.find().sort('-date').exec((err, comments) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(comments);
  });
}

/**
 * Get comments by post
 * @param req
 * @param res
 * @returns void
 */
export function getCommentsByPost(req, res) {
  Comment.find({ post: req.params.post }).exec((err, comments) => {
    if (err) {
      res.status(404).send(err);
    }
    res.json(comments);
  });
}

/**
 * Add a comment
 * @param req
 * @param res
 * @returns void
 */
export function addComment(req, res) {
  if (!req.body.name || !req.body.text) {
    res.status(403).end();
  }

  const newComment = new Comment(req.body);
  newComment.name = req.body.name;
  newComment.text = req.body.text;
  newComment.post = req.body.post;
  newComment.cuid = cuid();

  newComment.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

/**
 * Update a comment
 * @param req
 * @param res
 * @returns void
 */
export function updateComment(req, res) {
  Comment.findOneAndUpdate(
    { cuid: req.body.cuid },
    { $set: { text: req.body.text },
   })
  .exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(comment);
  });
}

/**
 * Remove a comment
 * @param req
 * @param res
 * @returns void
*/
export function removeComment(req, res) {
  Comment.findOne({ cuid: req.body.cuid }).remove((err, deleted) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).send(deleted);
  });
}
