import {
  ADD_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
} from './CommentActions';

const CommentReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_COMMENT :
      return [action.comment, ...state];

    case ADD_COMMENTS :
      return action.comments;

    case DELETE_COMMENT :
      return state.filter(comment => comment.cuid !== action.cuid);

    case EDIT_COMMENT : {
      const index = state.findIndex(comment => comment.cuid === action.comment.cuid);
      return [
        ...state.slice(0, index),
        action.comment,
        ...state.slice(index + 1),
      ];
    }

    default:
      return state;
  }
};

/* Selectors */

// Get all comments
export const getComments = state => state.comments;

// Get post by cuid
export const getComment = (comments, cuid) => comments.find(comment => comment.cuid === cuid);

// Export Reducer
export default CommentReducer;
