import test from 'ava';
import { reducerTest } from 'redux-ava';
import postReducer from '../PostReducer';
import { addPost, addSelectedPost, deletePost, addPosts } from '../PostActions';

test('action for ADD_POST is working', reducerTest(
  postReducer,
  { posts: ['foo'], post: null },
  addPost({
    name: 'prank',
    title: 'first post',
    content: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-post',
  }),
  { posts: [{
    name: 'prank',
    title: 'first post',
    content: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-post',
  }, 'foo'], post: null },
));

test('action for ADD_SELECTED_POST is working', reducerTest(
  postReducer,
  {
    posts: [{
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      _id: null,
      slug: 'first-post',

    }],
    selectedPost: null,
  },
  addSelectedPost({
    name: 'prank',
    title: 'first post',
    content: 'Hello world!',
    _id: null,
    slug: 'first-post',
  }),
  {
    posts: [{
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      _id: null,
      slug: 'first-post',
    }],
    post: {
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      _id: null,
      slug: 'first-post',
    },
  },
  {
    posts: [{
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      _id: null,
      slug: 'first-post',
    }],
    post: {
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      _id: null,
      slug: 'first-post',
    },
  },
));

test('action for DELETE_POST is working', reducerTest(
  postReducer,
  { posts: [{
    name: 'prank',
    title: 'first post',
    content: 'Hello world!',
    _id: 1,
    slug: 'first-post',
  }] },
  deletePost({
    name: 'prank',
    title: 'first post',
    content: 'Hello world!',
    _id: 1,
    slug: 'first-post',
  }),
  { posts: [] },
));

test('action for ADD_POSTS is working', reducerTest(
  postReducer,
  { posts: [], post: null },
  addPosts([
    {
      name: 'prank',
      title: 'first post',
      content: 'Hello world!',
      _id: null,
      cuid: null,
      slug: 'first-post',
    },
  ]),
  { posts: [{
    name: 'prank',
    title: 'first post',
    content: 'Hello world!',
    _id: null,
    cuid: null,
    slug: 'first-post',
  }], post: null },
));

