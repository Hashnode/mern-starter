import Comment from '../models/comment';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all comments
 * @param req
 * @param res
 * @returns comments
 */
export async function getComments(req, res) {
  let comments;
  const postId = req.params.postId;
  try {
    comments = await Comment.find({ postId }).sort('-dateAdded');
    res.json({ comments });
  } catch (err) {
    // logging system would be preferable, but i won't dive into that
    res.status(500).send({ error: 'database error!' });
  }
}

/**
 * Save a comment
 * @param req
 * @param res
 * @returns void
 */
export async function addComment(req, res) {
  if (!req.body.name || !req.body.content || !req.body.postId) {
    res.status(400).end({ error: 'one of the parameters is missing!' });
  }

  const newComment = new Comment(req.body);
  newComment.name = sanitizeHtml(newComment.name);
  newComment.content = sanitizeHtml(newComment.content);
  newComment.postId = sanitizeHtml(newComment.postId);
  newComment.cuid = cuid();
  let comment;
  try {
    comment = await newComment.save();
    res.json({ comment });
  } catch (err) {
    res.status(500).send({ error: 'database error!' });
  }
}
/**
 * Delete a comment
 * @param req
 * @param res
 * @returns void
 */
export async function deleteComment(req, res) {
  let comment;
  try {
    comment = await Comment.findOne({ cuid: req.params.cuid });
  } catch (err) {
    return res.status(500).send('database error!');
  }
  if (!comment) return res.status(500).send({ error: 'comment not found!' });
  try {
    await comment.remove();
    res.send();
  } catch (err) {
    res.status(500).send({ error: "couldn't delete the comment!" });
  }
}
/**
 * Edit a comment
 * @param req
 * @param res
 * @returns void
 */
export async function editComment(req, res) {
  const body = req.body;
  const id = req.params.cuid;
  if (!id) {
    res.status(400).end({ error: 'id parameter is missing!' });
  }
  let comment;
  try {
    comment = await Comment.findOne({ cuid: id });
  } catch (err) {
    return res.status(500).send({ error: 'database error!' });
  }
  if (!comment) return res.status(400).send({ error: 'comment not found, id can be incorrect!' });

  comment.name = sanitizeHtml(body.name) || comment.name;
  comment.content = sanitizeHtml(body.content) || comment.content;
  let editedComment;
  try {
    editedComment = await comment.save();
    res.json({ editedComment });
  } catch (err) {
    res.status(500).send({ error: 'database error!' });
  }
}

