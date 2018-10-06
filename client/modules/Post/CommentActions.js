import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

console.log(ADD_COMMENTS, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT)
// Export Actions
export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments,
  };
}

export function fetchComments(cuid) {
  return (dispatch) => {
    return callApi(`comments?post_id=${cuid}`, 'get').then(res => {
      dispatch(addComments(res.comments));
    });
  };
}

export function fetchComment(cuid) {
  return (dispatch) => {
    return callApi(`comments/${cuid}`).then(res => dispatch(addComment(res.comments)));
  };
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

export function addCommentRequest(comment) {
  return (dispatch) => {
    return callApi('comments', 'post', {
      comment: {
        post_id: comment.post_id,
        author: comment.author,
        text: comment.text,
      },
    }).then(res => dispatch(addComment(res.comment)));
  };
}

export function updateCommentRequest(cuid, text) {
  return (dispatch) => {
    return callApi(`comments/${cuid}/update`, 'post', { text }).then((comment) => dispatch(updateComment(cuid, comment)));
  };
}

export function updateComment(cuid, comment) {
  return {
    type: UPDATE_COMMENT,
    cuid,
    comment
  };
}

export function deleteCommentRequest(cuid) {
  return (dispatch) => {
    return callApi(`comments/${cuid}/delete`, 'post').then(() => dispatch(deleteComment(cuid)));
  };
}

export function deleteComment(cuid) {
  return {
    type: DELETE_COMMENT,
    cuid,
  };
}
