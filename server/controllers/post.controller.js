import Post from '../models/post';
import cuid from 'cuid';

export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ posts });
  });
}

export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    return res.status(403).end();
  }

  var newPost = new Post(req.body.post);
  newPost.slug = newPost.title.toLowerCase().replace(/[^\w ]+/g,'').replace(/ +/g,'-');
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.json({ post: saved });
  });
}

export function getPost(req, res) {
  var slug = req.query.slug.split('-');
  var cuid = slug[slug.length - 1];
  Post.findOne({ cuid: cuid }).exec((err, post) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ post });
  });
}

export function deletePost(req, res) {
  var postId = req.body.postId;
  Post.findById(postId).exec((err, post) => {
    if (err) {
      return res.status(500).send(err);
    }

    post.remove(function () {
      res.status(200).end();
    });
  });
}