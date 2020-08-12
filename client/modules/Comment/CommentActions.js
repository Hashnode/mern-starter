import callApi from '../../util/apiCaller';

// Export Constants
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';

// Export Actions

export function getComments(comments) {
  return {
    type: GET_COMMENTS,
    comments,
  };
}

export function fetchComments(id) {
  return (dispatch) => {
    return callApi(`/posts/${id}/comments`).then(res => {
      dispatch(getComments(res.comments));
    });
  };
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function addCommentRequest(comment, id) {
  return (dispatch) => {
    return callApi(`posts/${id}/comment`, 'post', {
      comment: {
        content: comment.content,
        createdBy: comment.createdBy,
      },
    }).then(res => dispatch(addComment(res.comment)));
  };
}


export function editComment(id, content) {
  return {
    type: EDIT_COMMENT,
    id,
    content,
  };
}

export function editCommentRequest(id, content) {
  return (dispatch) => {
    return callApi(`comment/${id}`, 'put', { content }).then(() => dispatch(editComment(id, content)));
  };
}

export function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    id,
  };
}

export function deleteCommentRequest(id) {
  return (dispatch) => {
    return callApi(`comment/${id}`, 'delete').then(() => dispatch(deleteComment(id)));
  };
}
