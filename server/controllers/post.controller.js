import Post from '../models/post';
import cuid from 'cuid';
import slug from 'slug';
import thinky from '../models/thinky.js';

var r = thinky.r;
var sanitizeHtml = require('sanitize-html');

export function getPosts(req, res) {
  Post.orderBy(r.desc('dateAdded')).run().then((posts) => {
    return res.json({ posts });
  }, (err) => {
    return res.status(500).send(err);
  });
}

export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    return res.status(403).end();
  }

  var newPost = new Post(req.body.post);

  //Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);
  
  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save().then((saved) => {
    return res.json({ post: saved });
  }, (err) => {
    return res.status(500).send(err);
  });
}

export function getPost(req, res) {
  var slug = req.query.slug.split('-');
  var cuid = slug[slug.length - 1];
  Post.filter({ cuid: cuid }).run().then((post) => {
    console.log(post);
    return res.json({ post });
  }, (err) => {
    return res.status(500).send(err);
  });
}

export function deletePost(req, res) {
  var postId = req.body.postId;
  Post.get(postId).run().then((post) => {
    post.delete().then(function () {
      res.status(200).end();
    });
  }, (err) => {
    return res.status(500).send(err);
  });
}