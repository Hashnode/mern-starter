import test from 'ava';
import { expect } from 'chai';
import request from 'supertest';
import app from '../server';
import Post from '../models/post';
import { connectDB, dropDB } from '../util/test-helpers';

// Initial posts added into test db
const posts = [
  new Post({name: 'Prashant', title: 'Hello Mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'"}),
  new Post({name: 'Mayank', title: 'Hi Mern', cuid: 'f34gb2bh24b24b3', content: "All dogs bark 'mern!'"})
];

test.beforeEach('connect and add two post entries', t => {

  connectDB(t, () => {
    Post.create(posts, err => {
      if(err) t.fail('Unable to create posts');
    });
  });
});

test.afterEach.always(t => {
  dropDB(t);
});

test.serial('Should correctly give number of Posts', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/posts')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(posts.length, res.body.posts.length);
});

test.serial('Should send correct data when queried against a title', async t => {
  t.plan(2);

  var post = new Post({ name: 'Foo', title: 'bar', slug: 'bar', cuid: 'f34gb2bh24b24b2', content: 'Hello Mern says Foo' });
  post.save();

  const res = await request(app)
    .get('/api/posts/foo-f34gb2bh24b24b2')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.post.name, post.name);
});

test.serial('Should correctly add a post', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/posts')
    .send({ post: { name: 'Foo', title: 'bar', content: 'Hello Mern says Foo' } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedPost = await Post.findOne({ title: 'bar' }).exec();
  t.is(savedPost.name, 'Foo');
});

test.serial('Should correctly delete a post', async t => {
  t.plan(2);

  const post = new Post({ name: 'Foo', title: 'bar', slug: 'bar', cuid: 'f34gb2bh24b24b2', content: 'Hello Mern says Foo' });
  post.save();

  const res = await request(app)
    .delete('/api/posts')
    .send({ id: post.id})
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedPost = await Post.findById(post.id).exec();
  t.is(queriedPost, null);
});

