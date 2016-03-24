import { take, call, put } from 'redux-saga/effects';
import fetch from 'isomorphic-fetch';
import { baseURL, addPost, deletePost, addPosts, addSelectedPost } from '../actions/actions';
import { ADD_POST_REQUEST, DELETE_POST_REQUEST, FETCH_POSTS, FETCH_POST } from '../constants/constants';

export function sendRequest(url, options) {
  return fetch(url, options)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      const error = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    .then(response => response.json())
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}

export function* addPostSaga() {
  while (true) { // eslint-disable-line
    // Listen for action
    const { post } = yield take(ADD_POST_REQUEST);

    // Send the request
    const { data, err } = yield call(sendRequest, `${baseURL}/api/addPost`, {
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
    });

    if (err !== undefined && err !== null) {
      // Error Action
      // console.log(err.response);
    } else {
      // Success Action
      yield put(addPost(data.post));
    }
  }
}

export function* deletePostSaga() {
  while (true) { // eslint-disable-line
    // Listen for action
    const { post } = yield take(DELETE_POST_REQUEST);

    // Send the request
    const { err } = yield call(sendRequest, `${baseURL}/api/deletePost`, {
      method: 'post',
      body: JSON.stringify({
        postId: post._id,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });

    if (err !== undefined && err !== null) {
      // Error Action
      // console.log(err.response);
    } else {
      // Success Action
      yield put(deletePost(post));
    }
  }
}

export function* fetchPostsSaga() {
  while (true) { // eslint-disable-line
    // Listen for action
    yield take(FETCH_POSTS);

    // Send the request
    const { data, err } = yield call(sendRequest, `${baseURL}/api/getPosts`);

    if (err !== undefined && err !== null) {
      // Error Action
      // console.log(err.response);
    } else {
      // Success Action
      yield put(addPosts(data.posts));
    }
  }
}

export function* fetchPostSaga() {
  while (true) { // eslint-disable-line
    // Listen for action
    const { post } = yield take(FETCH_POST);

    // Send the request
    const { data, err } = yield call(sendRequest, `${baseURL}/api/getPost?slug=${post.slug}-${post.cuid}`, {
      method: 'get',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    });

    if (err !== undefined && err !== null) {
      // Error Action
      // console.log(err.response);
    } else {
      // Success Action
      yield put(addSelectedPost(data.post));
    }
  }
}
