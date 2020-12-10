import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
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

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

export function addCommentRequest(comment) {
  return (dispatch) => {
    return callApi('comments', 'post', {
      comment: {
        name: comment.name,
        content: comment.content,
        postId: comment.postId
      }
    }).then(res => dispatch(addComment(res.comment)));
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

export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments
  };
}
export function fetchComments(postId) {
  return (dispatch) => {
    return callApi(`comments/${postId}`).then(res => {
      dispatch(addComments(res.comments));
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

export function deleteComment(cuid) {
  return {
    type: DELETE_COMMENT,
    cuid
  };
}
export function deleteCommentRequest(cuid) {
  return (dispatch) => {
    return callApi(`comments/${cuid}`, 'delete').then(() => dispatch(deleteComment(cuid)))
  };
}

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment,
  };
}

export function editCommentRequest(comment) {
  return (dispatch) => {
    return callApi(`comments/${comment.postId}`, 'post', {
      comment: {
        name: comment.name,
        content: comment.content,
      }
    }).then(res => dispatch(editComment(res.comment)));
  };
}
