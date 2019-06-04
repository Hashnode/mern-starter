import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostRequest(post) {
  return (dispatch) => {
    return callApi('posts', 'post', {
      post: {
        name: post.name,
        title: post.title,
        content: post.content,
      },
    }).then(res => dispatch(addPost(res.post)));
  };
}

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts,
  };
}

export function fetchPosts() {
  return (dispatch) => {
    return callApi('posts').then(res => {
      dispatch(addPosts(res.posts));
    });
  };
}

export function fetchPost(_id) {
  return (dispatch) => {
    return callApi(`posts/${_id}`).then(res => dispatch(addPost(res.post)));
  };
}

export function deletePost(_id) {
  return {
    type: DELETE_POST,
    _id,
  };
}

export function deletePostRequest(_id) {
  return (dispatch) => {
    return callApi(`posts/${_id}`, 'delete').then(() => dispatch(deletePost(_id)));
  };
}
