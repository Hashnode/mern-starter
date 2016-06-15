import test from 'ava';
import { actionTest } from 'redux-ava';
import {
  ADD_POST,
  ADD_SELECTED_POST,
  DELETE_POST,
  ADD_POSTS,
  addPost,
  addSelectedPost,
  deletePost,
  addPosts,
} from '../PostActions';

const post = { name: 'Prashant', title: 'Hello Mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'", slug: 'hello-mern', _id: 1 };

test('should return the correct type for addPost', actionTest(addPost, post, {
  type: ADD_POST,
  name: post.name,
  title: post.title,
  content: post.content,
  slug: post.slug,
  cuid: post.cuid,
  _id: post._id,
}));

test('should return the correct type for addSelectedPost', actionTest(deletePost, post, { type: DELETE_POST, post }));

test('should return the correct type for deletePost', actionTest(addSelectedPost, post, { type: ADD_SELECTED_POST, post }));

test('should return the correct type for addPosts', actionTest(addPosts, [post], {
  type: ADD_POSTS,
  posts: [post],
}));
