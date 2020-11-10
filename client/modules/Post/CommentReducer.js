import { ADD_COMMENT, DELETE_COMMENT } from './CommentActions';

// Initial State
const initialState = {
  data: [],
};

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT :
      return {
        data: [action.comment, ...state.data],
      };

    case DELETE_COMMENT :
      return {
        data: state.data.filter(comment => comment.commentId !== action.commentId),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getComments = state => state.comments.data;

// Get comment by cuid
export const getComment = (state, cuid) => state.posts.data.filter(comment => comment.cuid === cuid)[0];

// Export Reducer
export default CommentReducer;
