import { ADD_COMMENT, ADD_COMMENTS, UPDATE_COMMENT, DELETE_COMMENT } from './CommentActions';

console.log(ADD_COMMENT, ADD_COMMENTS, UPDATE_COMMENT, DELETE_COMMENT)
// Initial State
const initialState = { data: [] };

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT :
      return {
        data: [action.comment, ...state.data],
      };

    case ADD_COMMENTS :
      return {
        data: action.comments,
      };

    case UPDATE_COMMENT :
      const updatedComments = state.data.map(comment => {
        if(comment._id === action.cuid){
          return { ...comment, ...action.comment }
        }
        return comment
      })

      return {
        data: updatedComments,
      }

    case DELETE_COMMENT :
      return {
        data: state.data.filter(comment => comment._id !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all posts
export const getComments = state => state.comments.data;

// Export Reducer
export default CommentReducer;
