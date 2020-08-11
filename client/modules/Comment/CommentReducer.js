import { GET_COMMENTS, ADD_COMMENT } from './CommentActions';

// Initial State
const initialState = { comments: [] };

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS :
      return {
        comments: [action.comments, ...state.comments],
      };

    case ADD_COMMENT :
      return {
        comments: [action.comment, ...state.comments],
      };

    default:
      return state;
  }
};

// Export Reducer
export default CommentReducer;
