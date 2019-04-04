import { GET_COMMENTS_BY_POST, ADD_COMMENT, DELETE_COMMENT } from './CommentActions';

const initialState = { comments: [] };

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS_BY_POST:
      return {
        comments: action.comments,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(i => i.cuid !== action.payload),
      };
    default:
      return state;
  }
};

export default CommentReducer;

/* Selectors */
export const getComments = state => state.comments.comments;
