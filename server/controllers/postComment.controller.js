import Post from '../models/post';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export async function addComment(req, res) {
  try {
    if (!req.body.comment.author || !req.params.cuid || !req.body.comment.text) {
      return res.status(403).end();
    }
    const comment = {
      author: sanitizeHtml(req.body.comment.author),
      text: sanitizeHtml(req.body.comment.text),
      cuid: cuid(),
      createdAt: Date.now(),
    };
    await Post.update(
      { cuid: req.params.cuid },
      { $push: { comments: { $each: [comment], $position: 0 } } });

    return res.json({ comment });
  } catch (e) {
    return res.status(500).send(e);
  }
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export async function editComment(req, res) {
  try {
    if (!req.body.comment.cuid || !req.body.comment.author
      || !req.params.cuid || !req.body.comment.text) {
      res.status(403).end();
    }
    await Post.update({
      cuid: req.params.cuid,
      'comments.cuid': req.body.comment.cuid,
    }, {
      $set: {
        'comments.$.author': req.body.comment.author,
        'comments.$.text': req.body.comment.text,
      },
    });

    res.json({ comment: req.body.comment });
  } catch (e) {
    res.status(500).send(e);
  }
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export async function deleteComment(req, res) {
  try {
    await Post.update({ cuid: req.params.cuid }, {
      $pull: { comments: { cuid: req.params.commentId } },
    });

    res.json({ commentId: req.params.commentId });
  } catch (e) {
    res.status(500).send(e);
  }
}

