import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';

// Export Actions
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function addCommentRequest(comment, postId) {
  return dispatch => {
    return callApi(`posts/${postId}/comment`, 'post', {
      comment: {
        author: comment.author,
        content: comment.content,
      },
    }).then(res => dispatch(addComment(res.comment)));
  };
}

export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments,
  };
}

export function fetchComments(postId) {
  return (dispatch) => {
    return callApi(`posts/${postId}/comments`).then(res => {
      dispatch(addComments(res.comments));
    });
  };
}

export function deleteComment(cuid) {
  return {
    type: DELETE_COMMENT,
    cuid,
  };
}

export function editComment(cuid) {
  return {
    type: EDIT_COMMENT,
    cuid,
  };
}


export function updateComment(comment) {
  return {
    type: UPDATE_COMMENT,
    comment,
  };
}

export function deleteCommentRequest(cuid) {
  return (dispatch) => {
    return callApi(`comment/${cuid}`, 'delete').then(() => dispatch(deleteComment(cuid)));
  };
}

export function updateCommentRequest(comment) {
  return (dispatch) => {
    return callApi(`comment/${comment.cuid}`, 'put', { comment }).then(() => dispatch(updateComment(comment)));
  };
}
