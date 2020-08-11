import callApi from '../../util/apiCaller';

// Export Constants
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';

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
