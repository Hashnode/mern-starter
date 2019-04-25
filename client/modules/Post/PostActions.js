import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';

export const COMMENT_FORM_OPEN = 'COMMENT_FORM_OPEN';
export const COMMENT_FORM_CLOSE = 'COMMENT_FORM_CLOSE';
export const COMMENT_ADD = 'COMMENT_ADD';
export const COMMENT_REMOVE = 'COMMENT_REMOVE';

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

export function commentFormForPostClose(postId) {
  return {
    type: COMMENT_FORM_OPEN,
    payload: {
      postId,
    },
  };
}

export function commentAdd(authorName, comment, postId, _id) {
  return {
    type: COMMENT_ADD,
    payload: {
      authorName,
      comment,
      postId,
      _id,
    },
  };
}

export function commentRemove(commentId, postId) {
  return {
    type: COMMENT_REMOVE,
    payload: {
      commentId,
      postId,
    },
  };
}

export function commentRemoveRequest(commentId, postId) {
  return (dispatch) => {
    return callApi('comment', 'delete', { commentId, postId })
      .then((response) => {
        dispatch(commentRemove(
          response.commentId,
          response.postId
        ));
      });
  };
}

export function commentRequestAdd(authorName, comment, postId) {
  return (dispatch) => {
    return callApi('comment', 'post', { authorName, comment, postId })
      .then((response) => {
        dispatch(commentFormForPostClose());
        dispatch(commentAdd(
          response.authorName,
          response.comment,
          response.postId,
          response._id
        ));
      });
  };
}

export function commentFormForPostOpen(postId) {
  return {
    type: COMMENT_FORM_OPEN,
    payload: {
      postId,
    },
  };
}
