import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const ADD_COMMENT_TO_POST = 'ADD_COMMENT_TO_POST';
export const EDIT_POST_COMMENT = 'EDIT_POST_COMMENT';
export const DELETE_COMMENT_FROM_POST = 'DELETE_COMMENT_FROM_POST';

// Export Actions
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function addPostComment(comment, postId) {
  return {
    type: ADD_COMMENT_TO_POST,
    postId,
    comment,
  };
}

export function editPostComment(comment, postId) {
  return {
    type: EDIT_POST_COMMENT,
    postId,
    comment,
  };
}

export function deletePostComment(commentId, postId) {
  return {
    type: DELETE_COMMENT_FROM_POST,
    postId,
    commentId,
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

export function addCommentToPostRequest(comment, postId) {
  return (dispatch) => {
    return callApi(`posts/${postId}/comment`, 'post', {
      comment,
    }).then(res => dispatch(addPostComment(res.comment, postId)));
  };
}

export function editPostCommentRequest(comment, postId) {
  return (dispatch) => {
    return callApi(`/posts/${postId}/comment/${comment.cuid}`, 'put', {
      comment,
    }).then(res => dispatch(editPostComment(res.comment, postId)));
  };
}

export function deletePostCommentRequest(commentId, postId) {
  return (dispatch) => {
    return callApi(`posts/${postId}/comment/${commentId}`, 'delete')
      .then(() => dispatch(deletePostComment(commentId, postId)));
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

export function fetchPost(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`).then(res => dispatch(addPost(res.post)));
  };
}

export function deletePost(cuid) {
  return {
    type: DELETE_POST,
    cuid,
  };
}

export function deletePostRequest(cuid) {
  return (dispatch) => {
    return callApi(`posts/${cuid}`, 'delete').then(() => dispatch(deletePost(cuid)));
  };
}
