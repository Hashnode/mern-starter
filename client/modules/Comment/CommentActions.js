import callApi from '../../util/apiCaller';

export const GET_COMMENTS_BY_POST = 'GET_COMMENTS_BY_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const GET_ERRORS = 'GET_ERRORS';

export function deleteComment(cuid) {
  return (dispatch) => {
    callApi('comments', 'delete', { cuid });
    return dispatch({
      type: DELETE_COMMENT,
      payload: cuid,
    });
  };
}

export function addComment(post, name, text) {
  return (dispatch) => {
    return callApi('comments', 'post', { post, name, text }).then(res => dispatch({
      type: ADD_COMMENT,
      payload: res,
    }))
    .catch(() => dispatch({
      type: GET_ERRORS,
      payload: null,
    }));
  };
}

export function getCommentsByPost(post) {
  return (dispatch) => {
    return callApi(`comment/${post}`).then(res => dispatch({
      type: GET_COMMENTS_BY_POST,
      comments: res,
    }))
    .catch(() => dispatch({
      type: GET_COMMENTS_BY_POST,
      comments: [],
    }));
  };
}
