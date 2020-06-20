import { ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from './CommentActions';

// Initial State
const initialState = {
  comments: [{
    cid: 1,
    author: 'Alexey',
    content: 'Hello world!',
  }],
};

const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        comments: [...state.comments, {
          cid: state.comments.length > 0 ? state.comments[state.comments.length - 1].cid + 1 : 1,
          author: action.author,
          content: action.content,
        }],
      };
    case EDIT_COMMENT:
      return {
        comments: state.comments.map((comment) => {
          if (comment.cid === action.cid) {
            const newComment = {
              cid: comment.cid,
              author: action.author,
              content: action.content,
            };
            return newComment;
          }
          return comment;
        }),
      };

    case DELETE_COMMENT:
      return {
        comments: state.comments.filter(comment => comment.cid !== action.cid),
      };

    default:
      return state;
  }
};

// Selectors
export const getComments = state => state.comments;

// Get comment by cid
export const getComment = (state, cid) => {
  state.comments.comments.filter(comment => comment.cid === cid);
};

// Export Reducer
export default CommentReducer;
