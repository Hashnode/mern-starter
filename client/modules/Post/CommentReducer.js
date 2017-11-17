import {
  ADD_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  EDIT_COMMENT_MODE,
  CANCEL_EDIT_COMMENT,
  DELETE_COMMENT
} from "./CommentActions";

const initialState = {
  comments: [],
  editComment: null
};

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENTS:
      return { ...state, comments: action.comments };

    case ADD_COMMENT: {
      return { ...state, comments: [...state.comments, action.comment] };
    }

    case EDIT_COMMENT: {
      let index = state.comments.findIndex(comment => {
        if (comment.cuid === action.comment.cuid) {
          return true;
        }
        return false;
      });

      let startCommentArray = state.comments.slice(0, index);
      let endCommentArray = state.comments.slice(
        index + 1,
        state.comments.length
      );
      return {
        ...state,
        comments: [...startCommentArray, action.comment, ...endCommentArray]
      };
    }
    case EDIT_COMMENT_MODE:
      return { ...state, editComment: action.cuid };
    case CANCEL_EDIT_COMMENT:
      return { ...state, editComment: null };
    case DELETE_COMMENT:
      return {
        editComment: null,
        comments: state.comments.filter(comment => comment.cuid !== action.cuid)
      };
    default:
      return state;
  }
};

/* Selectors */

// Get corresponding comments
export const getComments = state => state.comments.comments;

export default CommentReducer;
