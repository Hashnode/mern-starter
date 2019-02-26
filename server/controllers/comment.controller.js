import mongoose from 'mongoose';
import Comment from '../models/comment';
import Post from '../models/post';

export function addComment(req, res) {
  const { authorName, comment, postId } = req.body;

  if (!authorName || !comment || !postId) {
    res.status(403).end();
  }

  const newComment = new Comment({ authorName, comment, postId });

  newComment.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }

    Post.update(
      {
        // eslint-disable-next-line
        _id: mongoose.Types.ObjectId(postId)
      },
      {
        $push: {
          comments: saved._id,
        },
      }, () => {
        res.json({
          ...saved._doc,
        });
      });
  });
}

export function removeComment(req, res) {
  const { postId, commentId } = req.body;

  if (!postId || !commentId) {
    res.status(403).end();
  }

  Comment.find({
    _id: commentId,
  }).remove().exec((err) => {
    if (err) {
      console.log('err', err);
      res.status(500).end();
    }
    Post.update({
      // eslint-disable-next-line
      _id: mongoose.Types.ObjectId(postId)
    }, {
      $pull: {
        // eslint-disable-next-line
        comments: mongoose.Types.ObjectId(commentId)
      },
    }, () => {
      console.log('commentId', commentId);
      res.json({ postId, commentId });
    });
  });
}
