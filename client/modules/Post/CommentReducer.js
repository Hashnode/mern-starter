/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
import {
  ADD_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  UPDATE_COMMENT,
} from './CommentActions';

// Initial State
const initialState = { data: [] };

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        data: [action.comment, ...state.data],
      };
    case ADD_COMMENTS:
      return {
        data: action.comments,
      };
    case DELETE_COMMENT:
      return {
        data: state.data.filter(comment => comment.cuid !== action.cuid),
      };
    case EDIT_COMMENT:
      return {
        data: state.data.map(comment => {
          comment.cuid === action.cuid
            ? (comment.isEdit = true)
            : (comment.isEdit = false);
          return comment;
        }),
      };
    case UPDATE_COMMENT:
      return {
        data: state.data.map(comment => {
          comment.isEdit = false;
          if (comment.cuid === action.comment.cuid) {
            comment.content = action.comment.content;
            return comment;
          }
          return comment;
        }),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all Comments
export const getComments = state => state.comments.data;

// Export Reducer
export default CommentReducer;
