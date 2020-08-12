import { GET_COMMENTS, ADD_COMMENT, DELETE_COMMENT, EDIT_COMMENT } from './CommentActions';

// Initial State
const initialState = { comments: [] };

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS :
      return {
        comments: action.comments,
      };

    case ADD_COMMENT :
      return {
        comments: [action.comment, ...state.comments],
      };

    case EDIT_COMMENT :
      return {
        comments: state.comments.map(comment => {
          if (comment._id === action.id) {
            const newComment = {
              content: action.content,
              postId: comment.postId,
              createdBy: comment.createdBy,
              dateAdded: comment.dateAdded,
            };

            return newComment;
          }
          return comment;
        }),
      };

    case DELETE_COMMENT :
      return {
        comments: state.comments.filter(comment => comment._id !== action.id),
      };

    default:
      return state;
  }
};

// Export Reducer
export default CommentReducer;
