import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

// Export Actions
export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function addCommentRequest(comment) {
  return (dispatch) => {
    return callApi('comments', 'post', { comment })
      .then(res => dispatch(addComment(res.comment)));
  };
}

export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments,
  };
}

export function fetchComments(postCuid) {
  return (dispatch) => {
    return callApi(`posts/${postCuid}/comments`).then(res => {
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

export function deleteCommentRequest(cuid) {
  return (dispatch) => {
    return callApi(`comments/${cuid}`, 'delete')
      .then(() => dispatch(deleteComment(cuid)));
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
    return callApi(`comments/${comment.cuid}`, 'put', { comment })
      .then(res => dispatch(editComment(res.comment)));
  };
}
