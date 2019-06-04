import test from 'ava';
import { reducerTest } from 'redux-ava';
import postReducer, { getPost, getPosts } from '../PostReducer';
import { addPost, deletePost, addPosts } from '../PostActions';

test('action for ADD_POST is working', reducerTest(
  postReducer,
  { data: ['foo'] },
  addPost({
    name: 'prank',
    title: 'first post',
    content: 'Hello world!',
    slug: 'first-post',
  }),
  {
    data: [{
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      slug: 'first-post',
    }, 'foo'],
  },
));

test('action for DELETE_POST is working', reducerTest(
  postReducer,
  {
    data: [{
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      _id: 'abc',
      slug: 'first-post',
    }],
  },
  deletePost('abc'),
  { data: [] },
));

test('action for ADD_POSTS is working', reducerTest(
  postReducer,
  { data: [] },
  addPosts([
    {
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      slug: 'first-post',
    },
  ]),
  {
    data: [{
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      slug: 'first-post',
    }],
  },
));

test('getPosts selector', t => {
  t.deepEqual(
    getPosts({
      posts: { data: ['foo'] },
    }),
    ['foo']
  );
});

test('getPost selector', t => {
  t.deepEqual(
    getPost({
      posts: { data: [{ _id: '123' }] },
    }, '123'),
    { _id: '123' }
  );
});

