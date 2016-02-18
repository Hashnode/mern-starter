
import Post from '../models/post';
import cuid from 'cuid';
import slug from 'slug';

var sanitizeHtml = require('sanitize-html');

export function getPosts(req, reply) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      return reply(err).statusCode = 500;
    }
    reply({ posts });
  });
}

export function addPost(req, reply) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    return reply(err).statusCode = 403;
  }

  var newPost = new Post(req.body.post);

  //Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      return reply(err).statusCode = 500;
    }
    return reply({ post: saved });
  });
}

export function getPost(req, reply) {
  var slug = req.query.slug.split('-');
  var cuid = slug[slug.length - 1];
  Post.findOne({ cuid: cuid }).exec((err, post) => {
    if (err) {
      return reply(err).statusCode = 500;
    }
    reply({ post });
  });
}

export function deletePost(req, reply) {
  var postId = req.body.postId;
  Post.findById(postId).exec((err, post) => {
    if (err) {
      return reply.statusCode = 500;
    }

    post.remove(function () {
      reply.statusCode = 200;
    });
  });
}
