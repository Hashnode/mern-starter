import callApi from "../../util/apiCaller";

export const ADD_COMMENTS = "ADD_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const EDIT_COMMENT_MODE = "EDIT_COMMENT_MODE";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const CANCEL_EDIT_COMMENT = "CANCEL_EDIT_COMMENT";
export const CLEAR_COMMENTS = "CLEAR_COMMENTS";

export function addComments(comments) {
  return {
    type: ADD_COMMENTS,
    comments
  };
}

export function fetchComments(cuid) {
  return dispatch => {
    return callApi(`posts/${cuid}/comments`).then(res => {
      dispatch(addComments(res.comments));
    });
  };
}

export function deleteComment(cuid) {
  return {
    type: DELETE_COMMENT,
    cuid
  };
}

export function deleteCommentRequest(cuid) {
  return dispatch => {
    return callApi(`comments/${cuid}`, "delete").then(() =>
      dispatch(deleteComment(cuid))
    );
  };
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

export function addCommentRequest(comment, ownerId) {
  return dispatch => {
    return callApi(`posts/${ownerId}/comments`, "post", {
      comment: {
        author: comment.author,
        body: comment.body
      }
    }).then(res => dispatch(addComment(res.comment)));
  };
}

export function enableEditMode(comment) {
  return {
    type: EDIT_COMMENT_MODE,
    comment
  };
}

export function cancelEditMode() {
  return {
    type: CANCEL_EDIT_COMMENT
  };
}

export function saveEdit(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  };
}

export function updateCommentRequest(commentBody, cuid) {
  return dispatch => {
    return callApi(`comments/${cuid}`, "put", {
      comment: {
        body: commentBody
      }
    }).then(res => dispatch(saveEdit(res.comment)));
  };
}

export function clearComments() {
  return {
    type: CLEAR_COMMENTS
  };
}
