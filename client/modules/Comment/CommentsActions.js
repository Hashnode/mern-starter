import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';

export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

// Export Actions
export function addCommentSuccess(comment) {
  return {
    type: ADD_COMMENT_SUCCESS,
    comment,
  };
}

export function addCommentFailure(error) {
  return {
    type: ADD_COMMENT_FAILURE,
    error,
  };
}

export function addCommentRequest(comment) {
  return (dispatch) => {
    return callApi('comments', 'post', {
      ...comment,
    })
      .then(res => dispatch(addCommentSuccess(res.comment)))
      .catch(error => dispatch(addCommentFailure(error)));
  };
}

export function editCommentSuccess(comment) {
  return {
    type: EDIT_COMMENT_SUCCESS,
    comment,
  };
}

export function editCommentFailure(error) {
  return {
    type: EDIT_COMMENT_FAILURE,
    error,
  };
}

export function editCommentRequest(comment) {
  return (dispatch) => {
    return callApi('comments', 'patch', {
      ...comment,
    })
      .then(res => dispatch(editCommentSuccess(res.comment)))
      .catch(error => dispatch(editCommentFailure(error)));
  };
}


export function deleteCommentSuccess(comment) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    comment,
  };
}

export function deleteCommentFailure(error) {
  return {
    type: DELETE_COMMENT_FAILURE,
    error,
  };
}

export function deleteCommentRequest(commentId) {
  return (dispatch) => {
    return callApi(`comments/${commentId}`, 'delete')
      .then(res => dispatch(deleteCommentSuccess(res.comment)))
      .catch(error => dispatch(deleteCommentFailure(error)));
  };
}
