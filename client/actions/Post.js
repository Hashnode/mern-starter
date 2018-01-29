import request from 'axios';

// Fetch All Posts

function fetchAllPostsRequest() {
  return {
    type: 'FETCH_ALL_POSTS_REQUEST',
  };
}

function fetchAllPostsSuccess(response) {
  return {
    type: 'FETCH_ALL_POSTS_SUCCESS',
    posts: response.data.posts,
  };
}

function fetchAllPostsFailure() {
  return {
    type: 'FETCH_ALL_POSTS_FAILURE',
  };
}

export function fetchAllPosts() {
  return (dispatch) => {
    dispatch(fetchAllPostsRequest());
    request
      .get('/api/posts')
      .then((response) => { dispatch(fetchAllPostsSuccess(response)); })
      .catch(() => { dispatch(fetchAllPostsFailure()); });
  };
}

// Fetch Single Post

function fetchSinglePostRequest() {
  return {
    type: 'FETCH_SINGLE_POST_REQUEST',
  };
}

function fetchSinglePostSuccess(response) {
  return {
    type: 'FETCH_SINGLE_POST_SUCCESS',
    post: response.data.post,
  };
}

function fetchSinglePostFailure() {
  return {
    type: 'FETCH_SINGLE_POST_FAILURE',
  };
}

export function fetchSinglePost(id) {
  return (dispatch) => {
    dispatch(fetchSinglePostRequest());
    request
      .get(`/api/posts/${id}`)
      .then((response) => { dispatch(fetchSinglePostSuccess(response)); })
      .catch(() => { dispatch(fetchSinglePostFailure()); });
  };
}
