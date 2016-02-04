/* eslint no-unused-vars: 0 */
import * as ActionTypes from '../constants/constants';
import fetch from 'isomorphic-fetch';
require('es6-promise').polyfill();

export function addPost(post) {
  return {
    type: ActionTypes.ADD_POST,
    name: post.name,
    title: post.title,
    content: post.content,
  };
}

export function changeSelectedPost(title) {
  return {
    type: ActionTypes.CHANGE_SELECTED_POST,
    title,
  };
}

export function addPostRequest(post) {
  return function (dispatch) {
    fetch('/api/addPost', {
      method: 'post',
      body: JSON.stringify({
        post: {
          name: post.name,
          title: post.title,
          content: post.content,
        },
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(() => dispatch(addPost(post)));
  };
}

export function addPosts(posts) {
  return {
    type: ActionTypes.ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return function (dispatch) {
    return fetch('http://localhost:8000/api/getPosts').
      then((response) => response.json()).
      then((response) => dispatch(addPosts(response.posts)));
  };
}
