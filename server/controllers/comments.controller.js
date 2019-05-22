import Comment from '../models/comments';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';


export function addComment(req, res) {
  if (!req.body.comment.author || !req.body.comment.text || !req.body.comment.postCuid) {
    res.status(403).end();
  }

  const comment = new Comment(req.body.comment);

  comment.author = sanitizeHtml(comment.author);
  comment.text = sanitizeHtml(comment.text);

  comment.cuid = cuid();
  comment.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ comment: saved });
    }
  });
}

export function getComments(req, res) {
  Comment.find()
    .sort('-dateAdded')
    .exec((err, comments) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ comments });
      }
    });
}

export function deleteComment(req, res) {
  Comment.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    } else {
      comment.remove(() => res.status(200).end());
    }
  });
}
