import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Post from '../post';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial posts added into test db
const posts = [
  new Post({ name: 'Prashant', title: 'Hello Mern', slug: 'hello-mern', content: "All cats meow 'mern!'" }),
  new Post({ name: 'Mayank', title: 'Hi Mern', slug: 'hi-mern', content: "All dogs bark 'mern!'" }),
];

test.before('connect to mockgoose', async () => {
  await connectDB();
});

test.beforeEach('connect and add two post entries', async () => {
  await Post.create(posts).catch(() => 'Unable to create posts');
});

test.afterEach.always(async () => {
  await dropDB();
});

test.serial('Should correctly give number of Posts', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/posts')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(posts.length, res.body.posts.length);
});

test.serial('Should send correct data when queried against a _id', async t => {
  t.plan(2);

  const post = new Post({ name: 'Foo', title: 'bar', slug: 'bar', content: 'Hello Mern says Foo' });
  post.save();

  const res = await request(app)
    .get(`/api/posts/${post._id}`)
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

  const post = new Post({ name: 'Foo', title: 'bar', slug: 'bar', content: 'Hello Mern says Foo' });
  post.save();

  const res = await request(app)
    .delete(`/api/posts/${post._id}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedPost = await Post.findOne({ _id: post._id }).exec();
  t.is(queriedPost, null);
});
