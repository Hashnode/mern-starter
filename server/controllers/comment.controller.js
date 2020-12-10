import Comment from '../models/comment';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import {ObjectId} from "mongodb";
/**
 * Get all comments
 * @param req
 * @param res
 * @returns void
 */
export function getComments(req, res) {
  Comment.find({ postId: req.params.id }).sort('-dateAdded').exec((err, comments) => {
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
  if (!req.body.comment.name || !req.body.comment.content || !req.body.comment.postId) {
    res.status(403).end();
  }

  const newComment = new Comment(req.body.comment);

  // Let's sanitize inputs
  newComment.name = sanitizeHtml(newComment.name);
  newComment.content = sanitizeHtml(newComment.content);
  newComment.cuid = cuid();
  newComment.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ comment: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
// export function getPost(req, res) {
//   Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//     res.json({ post });
//   });
// }

/**
 * Delete a comment
 * @param req
 * @param res
 * @returns void
 */
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


export async function editComment(req, res) {
  const { name, content } = req.body.comment;
  const buffComment = await Comment.findById(req.params.id);
  const updated = {
    ...buffComment,
    name: name || buffComment.name,
    content: content || buffComment.content,
  };

  try {
    const comment = await Comment.findByIdAndUpdate( req.params.id, { $set: updated }, { useFindAndModify: false, new: true });
    res.status(200).json({ comment });
  } catch (e) {
  }
}
