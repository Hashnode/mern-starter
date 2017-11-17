import Comment from "../models/comment";
import Post from "../models/post";
import cuid from "cuid";
import sanitizeHtml from "sanitize-html";

export function getComments(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    Comment.find({ owner: post._id }).exec((commentErr, comments) => {
      if (commentErr) {
        res.status(500).send(commentErr);
      }
      res.json({ comments });
    });
  });
}

export function addComment(req, res) {
  if (!req.body.comment.author || !req.body.comment.body) {
    res.status(403).end();
  }

  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    // probably remove
    if (!post) {
      res.status(400).end();
    }

    const newComment = new Comment(req.body.comment);

    newComment.author = sanitizeHtml(newComment.author);
    newComment.body = sanitizeHtml(newComment.body);
    newComment.cuid = cuid();
    newComment.owner = post;
    newComment.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ comment: saved });
    });
  });
}

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

export function updateComment(req, res) {
  if (!req.body.comment.body) {
    res.status(403).end();
  }
  Comment.findOne({ cuid: req.params.cuid }).exec((err, comment) => {
    if (err) {
      res.status(500).send(err);
    }

    if (!comment) {
      res.status(400).end();
    }
    comment.body = sanitizeHtml(req.body.comment.body);

    comment.save((saveErr, saved) => {
      if (saveErr) {
        res.status(500).send(saveErr);
      }

      res.json({ comment: saved });
    });
  });
}
