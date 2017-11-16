import callApi from "../../util/apiCaller";

export const ADD_COMMENTS = "ADD_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const EDIT_COMMENT_MODE = "EDIT_COMMENT_MODE";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const CANCEL_EDIT_COMMENT = "CANCEL_EDIT_COMMENT";

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
