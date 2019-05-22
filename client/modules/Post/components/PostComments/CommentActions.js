import callApi from '../../../../util/apiCaller';

export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';


function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  };
}

function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments,
  };
}

export function addCommentRequestAPI(comment) {
  return (dispatch) => {
    console.log(`addCommentRequest  ${comment.author}`);
    return callApi('comments', 'post', {
      comment: {
        author: comment.author,
        text: comment.text,
        postCuid: comment.postCuid,
      },
    })
      .then(res => dispatch(addComment(res.comment)));
  };
}

export function getCommentsRequestAPI() {
  return (dispatch) => {
    return callApi('comments')
      .then(res => {
        dispatch(addComments(res.comments));
      });
  };
}

export function todeleteCommentAPI(cuid, dispatch) {
  return callApi(`comments/${cuid}`, 'delete')
    .then(() => {
      dispatch({ type: DELETE_COMMENT, cuid });
    });
}

