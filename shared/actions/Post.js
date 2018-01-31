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

export function fetchSinglePost(slug) {
  return (dispatch) => {
    dispatch(fetchSinglePostRequest());
    request
      .get(`/api/posts/${slug}`)
      .then((response) => { dispatch(fetchSinglePostSuccess(response)); })
      .catch(() => { dispatch(fetchSinglePostFailure()); });
  };
}

// Delete a Post

function removePost(slug) {
  return { type: 'REMOVE_POST', slug };
}

export function deletePost(slug) {
  return (dispatch) => {
    dispatch(removePost(slug));

    request
      .delete(`/api/posts/${slug}`)
      .then(() => {})
      .catch(() => {});
  };
}


// Create a Post

function addPost(post) {
  return { type: 'ADD_POST', post };
}

export function createPost(title, content) {
  return (dispatch) => {
    request
      .post('/api/posts', {
        post: {
          title,
          content,
          name: 'Admin',
        },
      })
      .then((response) => {
        dispatch(addPost(response.data.post));
      })
      .catch(() => {});
  };
}
