/* eslint-disable */

var mocha = require('mocha');
var app = require('../server');
var chai = require('chai');
var request = require('supertest');
var mongoose = require('mongoose');
var Post = require('../models/post');
var expect = chai.expect;

// request = request(app);

function connectDB(done) {
  if (mongoose.connection.name !== 'mern-test') {
    return done();
  }

  mongoose.connect((process.env.MONGO_URL || 'mongodb://localhost:27017/mern-test'), function (err) {
    if (err) return done(err);
    done();
  });
}

function dropDB(done) {
  if (mongoose.connection.name !== 'mern-test') {
    return done();
  }

  mongoose.connection.db.dropDatabase(function (err) {
    mongoose.connection.close(done);
  });
}

describe('GET /api/getPosts', function () {

  beforeEach('connect and add two post entries', function (done) {

    connectDB(function () {
      var post1 = new Post({name: 'Prashant', title: 'Hello Mern', content: "All cats meow 'mern!'"});
      var post2 = new Post({name: 'Mayank', title: 'Hi Mern', content: "All dogs bark 'mern!'"});

      Post.create([post1, post2], function (err, saved) {
        done();
      });
    });
  });

  afterEach(function (done) {
    dropDB(done);
  });

  it('Should correctly give number of Posts', function (done) {

    request(app)
      .get('/api/getPosts')
      .set('Accept', 'application/json')
      .end(function (err, res) {
        Post.find().exec(function (err, posts) {
          expect(posts.length).to.equal(res.body.posts.length);
          done();
        });
      });
  });
});

describe('GET /api/getPost', function () {

  beforeEach('connect and add one Post entry', function(done){

    connectDB(function () {
      var post = new Post({ name: 'Foo', title: 'bar', content: 'Hello Mern says Foo', slug: 'bar', cuid: 'baz' });

      post.save(function (err, saved) {
        done();
      });

    });

  });

  afterEach(function (done) {
    dropDB(done);
  });

  it('Should send correct data when queried against a title', function (done) {

    request(app)
      .get('/api/getPost?slug=bar-baz')
      .set('Accept', 'application/json')
      .end(function (err, res) {
        Post.findOne({ title: 'bar' }).exec(function (err, post) {
          expect(post.name).to.equal('Foo');
          done();
        });
      });
  });

});

describe('POST /api/addPost', function () {

  beforeEach('connect and add a post', function (done) {

    connectDB(function () {
      done();
    });
  });

  afterEach(function (done) {
    dropDB(done);
  });

  it('Should send correctly add a post', function (done) {

    request(app)
      .post('/api/addPost')
      .send({ post: { name: 'Foo', title: 'bar', content: 'Hello Mern says Foo' } })
      .set('Accept', 'application/json')
      .end(function (err, res) {
        Post.findOne({ title: 'bar' }).exec(function (err, post) {
          expect(post.name).to.equal('Foo');
          done();
        });
      });
  });

});