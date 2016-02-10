import Post from '../models/post';

export function getPosts(req, res) {
  Post.find().exec((err, posts) => {
    res.json({ posts });
  });
}

export function addPost(req, res) {
  const newPost = new Post(req.body.post);
  newPost.save((err, saved) => {
    return res.json({ post: saved });
  });
}

export function getPost(req, res) {
  Post.findOne({ title: req.query.title }).exec((err, post) => {
    res.json({ post });
  });
}
