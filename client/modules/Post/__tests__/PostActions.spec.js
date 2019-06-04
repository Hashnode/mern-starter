import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  ADD_POST,
  DELETE_POST,
  ADD_POSTS,
  addPost,
  deletePost,
  addPosts,
} from '../PostActions';

const post = { name: 'Prashant', title: 'Hello Mern', content: "All cats meow 'mern!'", slug: 'hello-mern' };

test('should return the correct type for addPost', actionTest(
  addPost,
  post,
  { type: ADD_POST, post },
));

test('should return the correct type for deletePost', actionTest(
  deletePost,
  post._id,
  { type: DELETE_POST, _id: post._id },
));

test('should return the correct type for addPosts', actionTest(
  addPosts,
  [post],
  { type: ADD_POSTS, posts: [post] },
));
