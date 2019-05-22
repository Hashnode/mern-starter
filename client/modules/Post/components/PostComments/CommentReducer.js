import { ADD_COMMENTS, ADD_COMMENT, DELETE_COMMENT } from './CommentActions';


const initialState = { data: [] };

const CommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT :
      return {
        data: [action.comment, ...state.data],
      };

    case ADD_COMMENTS :
      return {
        data: action.comments,
      };

    case DELETE_COMMENT :
      return {
        data: state.data.filter((comment) => comment.cuid !== action.cuid)
      };

    default:
      return state;
  }
};

export default CommentsReducer;
